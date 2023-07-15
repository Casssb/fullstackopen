/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { MongooseError } from 'mongoose';

require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

const Person = require('./models/person');

app.use(express.json());
app.use(cors());
app.use(express.static('./src/dist'));

morgan.token('body', (req: Request, res: Response) => JSON.stringify(req.body));
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

app.get('/api/persons', (req: Request, res: Response) => {
  Person.find({}).then((people: any) => {
    res.json(people);
  });
});

app.get(
  '/api/persons/:id',
  (req: Request, res: Response, next: NextFunction) => {
    Person.findById(req.params.id)
      .then((person: any) => {
        if (person) {
          res.json(person);
        } else {
          res.status(404).end();
        }
      })
      .catch((error: MongooseError) => {
        next(error);
      });
  }
);

app.post('/api/persons', (req: Request, res: Response, next: NextFunction) => {
  const { name, number } = req.body;

  const newPerson = new Person({
    name,
    number,
  });
  newPerson
    .save()
    .then((result: any) => {
      res.json(result);
    })
    .catch((error: any) => next(error));
});

app.put(
  '/api/persons/:id',
  (req: Request, res: Response, next: NextFunction) => {
    const { name, number } = req.body;

    const updatedPerson = {
      name,
      number,
    };

    Person.findByIdAndUpdate(req.params.id, updatedPerson, {
      new: true,
      runValidators: true,
      context: 'query',
    })
      .then((updatePerson: any) => res.json(updatePerson))
      .catch((error: any) => next(error));
  }
);

app.delete(
  '/api/persons/:id',
  (req: Request, res: Response, next: NextFunction) => {
    Person.findByIdAndRemove(req.params.id)
      .then((result: any) => {
        res.status(204).end();
      })
      .catch((error: any) => next(error));
  }
);

app.get('/info', (req: Request, res: Response, next: NextFunction) => {
  const currentDate = new Date();
  Person.find({})
    .then((people: string | any[]) => {
      res.send(`<div>
                <h3>Phonebook has info for ${people.length} people</h3>
                <p>${currentDate.toLocaleString()}</p>
            </div>`);
    })
    .catch((error: any) => next(error));
});

const unkownEndpoint = (req: Request, res: Response) => {
  res.status(404).send({ error: 'unkown endpoint' });
};

app.use(unkownEndpoint);

const errorHandler: ErrorRequestHandler = (
  error,
  request,
  response,
  next: NextFunction
) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
