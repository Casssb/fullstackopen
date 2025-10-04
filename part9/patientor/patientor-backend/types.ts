import z from 'zod';
import { EntrySchema, NewEntrySchema, NewPatientSchema } from './schema';

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3,
}

export type Entry = z.infer<typeof EntrySchema>;

export type NewEntry = z.infer<typeof NewEntrySchema>;

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries?: Entry[];
}

export type NewPatient = z.infer<typeof NewPatientSchema>;

export type PatientDTO = Omit<Patient, 'ssn' | 'entries'>;
