// implement your API here
const express = require('express');
const db = require('./data/db.js');

const port = 5000;
const server = express();

//middleware
server.use(express.json());

server.post('/api/users', (req, res) => {
  const { name, bio } = req.body;
  const newUser = { name, bio };
  if (!name || !bio) {
    res
      .status(400)
      .json({ errorMessage: 'Please provide name and bio for the user.' });
    return;
  }
  db.insert(newUser)
    .then(id => {
      db.findById(id.id).then(user => {
        res.status(201).json(user);
      });
    })
    .catch(err => {
      res.status(500).json({
        error: 'There was an error while saving the user to the database'
      });
      return;
    });
});

server.get('/api/users', (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: 'The users information could not be retrieved.' });
      return;
    });
});

server.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  db.findById(id).then(user => {
    if (user) {
      res.status(200).json(user);
    } else {
      res
        .status(404)
        .json({ message: 'The user with the specified ID does not exist.' });
      return;
    }
  });
});

server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  db.remove(id).then(user => {
    if (user) {
      res.status(200).json(user);
    } else {
      res
        .status(404)
        .json({ message: 'The user with the specified ID does not exist.' });
      return;
    }
  });
});

server.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, bio } = req.body;
  if (!name || !bio) {
    res
      .status(400)
      .json({ errorMessage: 'Please provide name and bio for the user.' });
    return;
  }
  db.update(id, { name, bio })
    .then(user => {
      if ({ name, bio } === 0) {
        res
          .status(404)
          .json({ message: 'The user with the specified ID does not exist.' });
      }
      {
        db.findById(id).then(user => {
          res.status(200).json(user);
        });
      }
    })
    .catch(err => {
      res
        .status(500)
        .send({ error: 'The user information could not be modified.' });
    });
});

server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
