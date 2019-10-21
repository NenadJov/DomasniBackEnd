var express = require('express');
const fs = require('fs');
const path = require('path');

var routes = express.Router();

// routes.get('/', (req, res) =>{ //testna ruta
//     res.send('hello world');
// });

routes.get('/', (req, res) => {
    res.status(200).send(JSON.parse(fs.readFileSync('users.json')));
});

module.exports = routes;