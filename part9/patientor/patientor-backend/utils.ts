import { NewPatientSchema } from './schema';
import { NewPatient } from './types';

export const toNewPatient = (object: unknown): NewPatient => {
  return NewPatientSchema.parse(object);
};
