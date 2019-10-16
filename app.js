const express = require('express');
require('dotenv/config');
var bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.get('/', (req, res) =>{
//     res.send('<h1>hello world</h1>');
// });

let user = {
    name: 'Nenad',
    surname: 'Jovceski',
    email: 'nenad@gmail.com',
    age: 42,
    isActive: true
};

app.get('/write', (req, res) => {
    let data = JSON.stringify(user, null, 2);
    fs.writeFileSync('dat.json', data);
    res.send(user);
    // console.log(user);
});

app.get('/read', (req, res) => {
    let rawdata = fs.readFileSync('dat.json');
    let user = JSON.parse(rawdata);
    res.send(user);
    // console.log(user);
});

app.get('/users', (req, res) => {
    res.status(200).send(JSON.parse(fs.readFileSync('users.json')));
});

// app.get('/users/:name', (req, res) => {
//     let rawdata = fs.readFileSync('users.json');
//     let users = JSON.parse(rawdata);

//     let cUser = users.filter((y) => {
//         return y.name == req.params.name;
//     });

//     res.status(200).send(cUser[0]);
// });

app.get('/users/:id', (req, res) => {
    let rawdata = fs.readFileSync('users.json');
    let users = JSON.parse(rawdata);

    let currentUser = users.filter((x) => {
        return x.id == req.params.id;
    });

    res.status(200).send(currentUser[0]);

});

app.post('/users', (req, res) => {
    let rawdata = fs.readFileSync('users.json');
    let users = JSON.parse(rawdata);
    users.push(req.body);
    let data = JSON.stringify(users, null, 2);
    fs.writeFileSync('users.json', data);
    res.status(200).send('user created');
});

app.put('/users/:id', (req, res) => {
    let rawdata = fs.readFileSync('users.json');
    let users = JSON.parse(rawdata);

    users.filter((z) => {
        if (z.id == req.params.id) {
            z.name = req.body.name;
            z.surname = req.body.surname;
            z.email = req.body.email;
            z.age = req.body.age;
            z.isActive = req.body.isActive;
            let data = JSON.stringify(users, null, 2);
            fs.writeFileSync('users.json', data);
        }
    });
    res.status(200).send("Full update for user with id = " + req.params.id);
});

app.patch('/users/:id', (req, res) => {
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

app.delete('/users/:id', (req, res) => {
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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on ${PORT}`));
