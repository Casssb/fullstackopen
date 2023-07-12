import { SyntheticEvent, useEffect, useState } from 'react';
import PersonForm from './components/PersonForm';
import PersonDisplay from './components/PersonDisplay';
import Filter from './components/Filter';
import Services from './components/Services';
import Message from './components/Message';

export interface Person {
  name: string;
  number: number | null;
  id?: number;
}

const App = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState<string>('');
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [filteredPersons, setFilteredPersons] = useState<Person[]>([]);

  const showErrorMessage = (isSuccess: boolean, message: string) => {
    setError(message);
    setIsSuccess(isSuccess);
    setTimeout(() => {
      setError('');
    }, 3000);
  };

  const addPerson = (e: SyntheticEvent) => {
    e.preventDefault();

    // If there is nothing in the naem input
    if (!newName.length) {
      showErrorMessage(false, 'Please enter a name');
      return;
    }

    // If there is nothing in the number input
    if (!newNumber) {
      showErrorMessage(false, 'Please enter a number');
      return;
    }

    // If the inputted name matches a name stored in state
    if (
      persons.some(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      )
    ) {
      showErrorMessage(false, `${newName} is already in the phonebook`);

      // Confirm if the user wants to update the number matching the name entered
      if (
        confirm(
          `${newName} is already in the phonebook, replace the old number with a new one?`
        )
      ) {
        const [personToUpdate] = persons.filter(
          (person) => person.name.toLowerCase() === newName.toLowerCase()
        );

        // Call the service which updates the number on the server
        void Services.updatePerson(personToUpdate, newNumber, showErrorMessage);

        // Use map to create a new array replacing the duplicate number in the object matching the name
        setPersons(
          persons.map((person) => {
            if (person.name.toLowerCase() === newName.toLowerCase()) {
              return {
                ...person,
                number: Number(newNumber),
              };
            } else {
              return person;
            }
          })
        );
      }
      setNewName('');
      setNewNumber('');
      return;
    }
    const newPerson = { name: newName, number: Number(newNumber) };
    void Services.createPerson(newPerson, setPersons, showErrorMessage);
    setNewName('');
    setNewNumber('');
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

  const handleDelete = (e: SyntheticEvent, id: number, name: string): void => {
    e.preventDefault();
    if (window.confirm(`Delete ${name}?`)) {
      void Services.deletePerson(id, name, showErrorMessage);
      setPersons(persons.filter((person) => person.id !== id));
    }
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
        ? persons.map((person) => (
            <PersonDisplay
              key={person.id}
              person={person}
              handleDelete={handleDelete}
            />
          ))
        : filteredPersons.map((person) => (
            <PersonDisplay
              key={person.id}
              person={person}
              handleDelete={handleDelete}
            />
          ))}
      {error && <Message isSuccess={isSuccess} errorMsg={error} />}
    </div>
  );
};

export default App;
