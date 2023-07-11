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

const createPerson = async (person: Person) => {
  try {
    const request = await axios.post(url, person)
    const response = request.data as Person
    console.log(response)
  } catch (error) {
    console.log(error);
  }
};

const updatePerson =async (person: Person, newNumber: string) => {
  const updatedPerson = {
    ...person,
    number: newNumber
  }
  try {
    const request = await axios.put(`${url}/${person.id!}`, updatedPerson)
    const response = request.data as Person
    console.log(response)
  } catch (error) {
    console.log(error)
  }
}

const deletePerson =async (id: number) => {
  try {
    const request = await axios.delete(`${url}/${id}`)
    const response = request.data as Person
    console.log(response)
  } catch (error) {
    console.log(error)
  }
}

export default {
  getPersons,
  createPerson,
  updatePerson,
  deletePerson
};
