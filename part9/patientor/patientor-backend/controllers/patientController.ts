import express from 'express';
import patientService from '../services/patientService';
import z from 'zod';
import { EntrySchema, NewPatientSchema } from '../schema';

const patientController = express.Router();

patientController.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

patientController.post('/', (req, res) => {
  try {
    const newPatient = NewPatientSchema.parse(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: 'unkown error' });
    }
  }
});

patientController.get('/:id', (req, res) => {
  res.send(patientService.getPatientById(req.params.id) ?? []);
});

patientController.post('/:id/entries', (req, res) => {
  try {
    const newEntry = EntrySchema.parse(req.body);
    const addedEntry = patientService.addEntry(newEntry, req.params.id);
    res.json(addedEntry);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: error ? error : 'unkown error' });
    }
  }
});

export default patientController;
