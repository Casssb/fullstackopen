import express, { Request } from 'express';
import cors from 'cors';
import diagnosisController from './controllers/diagnosisController';
import patientController from './controllers/patientController';

const app = express();
app.use(express.json());
app.use(cors<Request>());

const PORT = 3000;

app.use('/api/diagnoses', diagnosisController);
app.use('/api/patients', patientController);

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
