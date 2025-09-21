import express from 'express';
import patientService from '../services/patientService';
import { NewPatientSchema } from '../utils';
import z from 'zod';

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

export default patientController;
