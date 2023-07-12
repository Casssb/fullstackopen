import { Request, Response, response } from 'express';

interface Person {
  id: number;
  name: string;
  number: string;
}

const express = require('express');
const app = express();

let db = require('./db.json');

app.use(express.json());

app.get('/api/persons', (req: Request, res: Response) => {
  res.json(db);
});

app.get('/api/persons/:id', (req: Request, res: Response) => {
  const id = req.params.id;
  const result = db.filter((person: Person) => person.id === Number(id));
  if (result.length) {
    db = db.filter((person: Person) => person.id !== Number(id));
    res.json(result);
  } else {
    res.status(404).end();
  }
});

app.post('/api/persons', (req: Request, res: Response) => {
    const person = req.body

    const sameName = db.filter((p: Person) => p.name.toLowerCase() === person.name.toLowerCase())

    if(sameName.length) {
        return res.status(400).json({error: 'A Person with that name is already listed'})
    }

    if(!person.name && ! person.number) {
        return res.status(400).json({error: 'Missing content: name & number'})
    }

    if(!person.name) {
        return res.status(400).json({error: 'Missing content: name'})
    }

    if(!person.number) {
        return res.status(400).json({error: 'Missing content: number'})
    }

    // const randId = Math.floor(Math.random() * 1000)

    const formattedPerson: Person = {
        name: person.name,
        number: person.number,
        id: db.length + 1
    }

    db = [...db, formattedPerson]
    res.json(formattedPerson)
  });

app.delete('/api/persons/:id', (req: Request, res: Response) => {
  const id = req.params.id;
  const result = db.filter((person: Person) => person.id !== Number(id));
  if (result.length) {
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

app.get('/info', (req: Request, res: Response) => {
  const currentDate = new Date();
  res.send(`<div>
                <h3>Phonebook has info for ${db.length} people</h3>
                <p>${currentDate.toLocaleString()}</p>
            </div>`);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
