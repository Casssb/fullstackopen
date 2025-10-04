import { v1 as uuid } from 'uuid';
import patientData from '../data/patients';
import { Entry, NewEntry, NewPatient, Patient, PatientDTO } from '../types';

const getPatients = (): PatientDTO[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatientById = (id: string): Patient | undefined => {
  return patientData.find((patient) => patient.id === id);
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };
  patientData.push(newPatient);
  return newPatient;
};

const addEntry = (entry: NewEntry, id: string): Entry => {
  const newEntry = {
    id: uuid(),
    ...entry,
  };
  const foundPatient = patientData.find((patient) => patient.id === id);
  if (foundPatient?.entries) {
    foundPatient.entries.push(newEntry);
    return newEntry;
  } else {
    throw new Error('Patient not found');
  }
};

export default {
  getPatients,
  getPatientById,
  addPatient,
  addEntry,
};
