import { SyntheticEvent, useEffect, useState } from 'react';
import PersonForm from './components/PersonForm';
import PersonDisplay from './components/PersonDisplay';
import Filter from './components/Filter';
import Services from './components/Services';

export interface Person {
  name: string;
  number: number | null;
  id: number;
}

const App = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [filterText, setFilterText] = useState('');
  const [filteredPersons, setFilteredPersons] = useState<Person[]>([]);

  const addPerson = (e: SyntheticEvent) => {
    e.preventDefault();
    setError('');
    if (!newName.length) {
      setError('Please enter a name');
      return;
    }
    if (!newNumber) {
      setError('Please enter a number');
      return;
    }
    if (persons.some((person) => person.name === newName)) {
      setError(`${newName} is already in the phonebook`);
      alert(`${newName} is already in the phonebook`);
      return;
    }
    const newPerson = { name: newName, number: Number(newNumber), id: persons.length + 1 }
    void Services.createPerson(newPerson)
    setPersons([...persons, newPerson])
    setNewName('');
    setNewNumber('')
  };

  const filterByName = (e: SyntheticEvent) => {
    e.preventDefault();
    const searchName = (e.target as HTMLInputElement).value;
    setFilterText(searchName);
    const filteredPeople = persons.filter((person) =>
      person.name.toLowerCase().includes(searchName.toLowerCase())
    );
    setFilteredPersons(filteredPeople);
  };


  useEffect(() => {
    void Services.getPersons(setPersons);
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterText={filterText} filterByName={filterByName} />
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        addPerson={addPerson}
      />
      <h3>People</h3>
      {!filteredPersons.length
        ? persons.map((person) => <PersonDisplay key={person.id} person={person} />)
        : filteredPersons.map((person) => <PersonDisplay key={person.id} person={person} />)}
      {error && <p>{error}</p>}
    </div>
  );
};

export default App;