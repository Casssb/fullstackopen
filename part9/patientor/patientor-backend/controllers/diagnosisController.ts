import express from 'express';
import diagnosisService from '../services/diagnosisService';

const diagnosisController = express.Router();

diagnosisController.get('/', (_req, res) => {
  res.send(diagnosisService.getDiagnoses());
});

export default diagnosisController;
