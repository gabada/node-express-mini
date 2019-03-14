// implement your API here
const express = require('express');
const db = require('./data/db.js');

const port = 5000;
const server = express();

//middleware
server.use(express.json());

server.post('/api/users',(req, res) => {
    const {name, bio} = req.body;
    if (!name || !bio) {
        res.status(400).json({errorMessage: "Please provide name and bio for the user."});
        return;
    }
    db
        .insert({name, bio})
        .then(response => {
            res.status(201).json(response);
        })
        .catch(err  => {
            res.status(500).json({ err })
        })
});


server.get('/api/users',(req, res) => {
    db
        .find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({ message: "The users information could not be retrieved."});
            return;
        })
});

server.get('/api/users/:id',(req, res) => {
    const { id } = req.params;
    db
        .findById(id)
        .then(user => {
            if(user) {
            res.status(200).json(user);
            } else {
            res.status(404).json({ message: "The user with the specified ID does not exist."})
            return;
        }
    })})

server.delete('/api/users/:id',(req, res) => {
    const { id } = req.params;
    db
        .remove(id)
        .then(user => {
            if(user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist."})
            return;
        }})
});


server.listen(port, () => {
    console.log(`server listening on port ${port}`);
})