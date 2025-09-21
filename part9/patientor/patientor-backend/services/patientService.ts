import { v1 as uuid } from 'uuid';
import patientData from '../data/patients';
import { NewPatient, Patient, PatientDTO } from '../types';

const getPatients = (): PatientDTO[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...entry,
  };
  patientData.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  addPatient,
};
