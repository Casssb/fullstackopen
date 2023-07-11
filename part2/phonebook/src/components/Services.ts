import axios from 'axios';
import { Person } from '../App';

const url = 'http://localhost:3001/persons';

const getPersons = async (setter: (arg0: Person[]) => void): Promise<void> => {
  try {
    const personsPromise = await axios.get(url);
    const personsJSON = personsPromise.data as Person[];
    setter(personsJSON);
  } catch (error) {
    console.log(error);
  }
};

const createPerson = async (
  person: Person,
  setter: (arg0: Person[]) => void,
  showErrorMessage: (isSuccess: boolean, message: string) => void
): Promise<void> => {
  try {
    const request = await axios.post(url, person);
    const response = request.data as Person;
    setter((prev) => [...prev, response]);
    showErrorMessage(true, `${response.name} has been added to the phonebook`);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

const updatePerson = async (
  person: Person,
  newNumber: string,
  showErrorMessage: (isSuccess: boolean, message: string) => void
) => {
  const updatedPerson = {
    ...person,
    number: newNumber,
  };
  try {
    const request = await axios.put(`${url}/${person.id!}`, updatedPerson);
    const response = request.data as Person;
    showErrorMessage(true, `${response.name}'s old number has been updated to ${newNumber}`);
    console.log(response);
  } catch (error) {
    showErrorMessage(false, `${person.name} has been removed from the server (you may need to refresh your browser)`);
    console.log(error);
  }
};

const deletePerson = async (
  id: number,
  name: string,
  showErrorMessage: (isSuccess: boolean, message: string) => void
) => {
  try {
    const request = await axios.delete(`${url}/${id}`);
    const response = request.data as Person;
    showErrorMessage(true, `${name} has been deleted from the Phonebook`);
    console.log(response);
  } catch (error) {
    showErrorMessage(false, `${name} has already been deleted from the Phonebook`);
    console.log(error);
  }
};

export default {
  getPersons,
  createPerson,
  updatePerson,
  deletePerson,
};
