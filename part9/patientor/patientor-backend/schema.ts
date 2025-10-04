import z from 'zod';
import { Gender, HealthCheckRating } from './types';

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string(),
  gender: z.enum(Object.values(Gender)),
  occupation: z.string(),
});

export const HealthCheckRatingSchema = z
  .enum(HealthCheckRating)
  .refine((val) => [0, 1, 2, 3].includes(val as HealthCheckRating), {
    message: 'Invalid HealthCheckRating value. Must be 0, 1, 2, or 3.',
  });

export const DischargeSchema = z.object({
  date: z.iso.date(),
  criteria: z.string().min(1),
});

export const SickLeaveSchema = z.object({
  startDate: z.iso.date(),
  endDate: z.iso.date(),
});

export const BaseEntrySchema = z.object({
  id: z.uuid().optional(),
  description: z.string().min(5),
  date: z.iso.date(),
  specialist: z.string().min(3),
  diagnosisCodes: z.array(z.string()).optional(),
});

export const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.literal('HealthCheck'),
  healthCheckRating: HealthCheckRatingSchema,
});

export const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.literal('Hospital'),
  discharge: DischargeSchema,
});

export const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
  type: z.literal('OccupationalHealthcare'),
  employerName: z.string().min(1),
  sickLeave: SickLeaveSchema.optional(),
});

export const EntrySchema = z.discriminatedUnion('type', [
  HealthCheckEntrySchema,
  HospitalEntrySchema,
  OccupationalHealthcareEntrySchema,
]);

export const NewHealthCheckEntrySchema = HealthCheckEntrySchema.omit({
  id: true,
});

export const NewHospitalEntrySchema = HospitalEntrySchema.omit({
  id: true,
});

export const NewOccupationalHealthcareEntrySchema =
  OccupationalHealthcareEntrySchema.omit({
    id: true,
  });

export const NewEntrySchema = z.discriminatedUnion('type', [
  NewHealthCheckEntrySchema,
  NewHospitalEntrySchema,
  NewOccupationalHealthcareEntrySchema,
]);
