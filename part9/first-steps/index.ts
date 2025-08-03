import express from 'express';
import { calculateBMI } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

interface exerciseBody {
  daily_exercises?: number[];
  target?: number;
}

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!isNaN(height) && !isNaN(weight)) {
    const bmiOutcome = calculateBMI(height, weight);
    res.status(200).send({
      weight: weight,
      height: height,
      bmi: bmiOutcome,
    });
  } else {
    res
      .status(400)
      .send({ error: 'incorrect parameters supplied, two numbers expected' });
  }
});

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body as exerciseBody;

  const isDailyExcercisesValid = Array.isArray(daily_exercises)
    ? daily_exercises.map((elem) => isNaN(Number(elem))).filter(Boolean)
        .length === 0
    : false;

  if (!daily_exercises || !target) {
    res.status(400).send({ error: 'parameters missing' });
    return;
  }

  if (!isDailyExcercisesValid || isNaN(Number(target))) {
    res.status(400).send({ error: 'malformatted parameters' });
    return;
  }

  const exerciseReport = calculateExercises(daily_exercises, target);
  res.status(200).send(exerciseReport);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
