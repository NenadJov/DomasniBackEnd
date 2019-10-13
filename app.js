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
    console.log(user);
});

app.get('/read', (req, res) => {
    let rawdata = fs.readFileSync('dat.json');
    let user = JSON.parse(rawdata);
    res.send(user);
    console.log(user);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on ${PORT}`));
