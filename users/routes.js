var express = require('express');
const fs = require('fs');
const path = require('path');
const actions = require('./actions');
const { emailValidator } = require('../helper');
const { checkIsOlderThan18 } = require('../helper');

var routes = express.Router();

// routes.get('/', (req, res) =>{      //testna ruta
//     res.send('hello world');
// });

routes.get('/', actions.getAllUsers);

// routes.get('/:name', (req, res) => {
//     let rawdata = fs.readFileSync('users.json');
//     let users = JSON.parse(rawdata);

//     let cUser = users.filter((y) => {
//         return y.name == req.params.name;
//     });

//     res.status(200).send(cUser[0]);
// });

routes.get('/:id', actions.getSpecificUser);

routes.post('/', emailValidator, checkIsOlderThan18, actions.createUser);

// routes.post('/users', (req, res) => {
//     let rawdata = fs.readFileSync('users.json');
//     let users = JSON.parse(rawdata);
//     users.push(req.body);
//     let data = JSON.stringify(users, null, 2);
//     fs.writeFileSync('users.json', data);
//     res.status(200).send('user created');
// });

routes.put('/:id', actions.changeUser);

//ova e dobro resenie
// routes.put('/:id', (req, res) => {
//     let rawdata = fs.readFileSync('users.json');
//     let users = JSON.parse(rawdata);

//     users.filter((z) => {
//         if (z.id == req.params.id) {
//             z.name = req.body.name;
//             z.surname = req.body.surname;
//             z.email = req.body.email;
//             z.age = req.body.age;
//             z.isActive = req.body.isActive;
//             let data = JSON.stringify(users, null, 2);
//             fs.writeFileSync('users.json', data);
//         }
//     });
//     res.status(200).send("Full update for user with id = " + req.params.id);
// });

routes.patch('/:id', actions.changePartUser);

routes.delete('/:id',actions.deleteUser);

module.exports = routes;