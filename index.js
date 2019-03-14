// implement your API here
const express = require('express');
const db = require('./data/db.js');

const port = 5000;
const server = express();

server.post('/api/users',(req, res) => {
    res.send('Hello World from Express!');
});

server.get('/api/users',(req, res) => {
    db
        .find()
        .then(users => {
            res.status(200).json(users);
        })
});

server.listen(port, () => {
    console.log(`server listening on port ${port}`);
})