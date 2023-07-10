import { SyntheticEvent, useState } from 'react';
import PersonForm from './components/PersonForm';
import PersonDisplay from './components/PersonDisplay';
import Filter from './components/Filter';

export interface Person {
  name: string;
  number: number | null;
}

const App = () => {
  const [persons, setPersons] = useState<Person[]>([
    { name: 'Arto Hellas', number: 999923424 },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState<number | null>(null);
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
    setPersons([...persons, { name: newName, number: newNumber }]);
    setNewName('');
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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterText={filterText} filterByName={filterByName} />
      <PersonForm
        newName={newName}
        newNumber={newNumber as number}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        addPerson={addPerson}
      />
      <h3>People</h3>
      {!filteredPersons.length
        ? persons.map((person) => <PersonDisplay person={person} />)
        : filteredPersons.map((person) => <PersonDisplay person={person} />)}
      {error && <p>{error}</p>}
    </div>
  );
};

export default App;
