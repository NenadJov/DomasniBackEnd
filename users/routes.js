var express = require('express');
const fs = require('fs');
const path = require('path');
const actions = require('./actions');

var routes = express.Router();

// routes.get('/', (req, res) =>{ //testna ruta
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

routes.put('/:id', (req, res) => {
    let rawdata = fs.readFileSync('users.json');
    let users = JSON.parse(rawdata);
    users.forEach(member => {
        if (member.id == req.params.id) {
            return users.splice(users.indexOf(member), 1, req.body);
        };
    });
    let data = JSON.stringify(users, null, 2);
    fs.writeFileSync('users.json', data);
    res.status(200).send("Full update for user with id = " + req.params.id);
});

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

routes.patch('/:id', (req, res) => {
    let rawdata = fs.readFileSync('users.json');
    let users = JSON.parse(rawdata);

    users.forEach(member => {
        if (member.id === parseInt(req.params.id)) {
            member.age = req.body.age;
            member.isActive = req.body.isActive;
            let data = JSON.stringify(users, null, 2);
            fs.writeFileSync('users.json', data);
            return;
        }
    })
    res.send("Partial update for user with id = " + req.params.id);
});

routes.post('/', actions.createUser);

// routes.post('/users', (req, res) => {
//     let rawdata = fs.readFileSync('users.json');
//     let users = JSON.parse(rawdata);
//     users.push(req.body);
//     let data = JSON.stringify(users, null, 2);
//     fs.writeFileSync('users.json', data);
//     res.status(200).send('user created');
// });

routes.delete('/:id', (req, res) => {
    let rawdata = fs.readFileSync('users.json');
    let users = JSON.parse(rawdata);
    users.forEach(member => {
        if (member.id == req.params.id) {
            users.splice(users.indexOf(member), 1);
            let data = JSON.stringify(users, null, 2);
            fs.writeFileSync('users.json', data);
            res.status(200).send("Delete user with id = " + req.params.id);
        };
    });
});

module.exports = routes;