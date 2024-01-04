const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs');
  response.json(users);
});

usersRouter.get('/:id', async (request, response, next) => {
  try {
    const user = await User.findById(request.params.id).populate('blogs');
    if (user) {
      response.json(user);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;

  if (password === undefined) {
    return response.status(400).json({ error: 'A password is required' });
  }

  if (password.length < 3) {
    return response.status(400).json({
      error: `User validation failed: password (${password}) is shorter than the minimum allowed length (3).`,
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

module.exports = usersRouter;
