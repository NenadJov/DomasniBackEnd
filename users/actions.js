const fs = require('fs');
const path = require('path');
// res.status(200).send(JSON.parse(fs.readFileSync('users.json')));

getAllUsers = (req, res) =>{
    res.status(200).send(JSON.parse(fs.readFileSync('users.json')));
};

getSpecificUser = (req, res, next) => {
    let rawdata = fs.readFileSync('users.json');
    let users = JSON.parse(rawdata);

    if (req.params.id == 0) {
        var error = new Error("id can not be 0!!!");
        error.status = 403;
        next(error);
    } else {
        let currentUser = users.filter((x) => {
            return x.id == req.params.id;
        });
        res.status(200).send(currentUser[0]);
    }
};

createUser = (req, res, next) => {
    let rawdata = fs.readFileSync('users.json');
    let users = JSON.parse(rawdata);
    users.forEach(member => {
        if (member.id == req.body.id) {
            var error = new Error("id already exist!!!");
            error.status = 409;
            next(error);
        } else {
            users.push(req.body);
            let data = JSON.stringify(users, null, 2);
            fs.writeFileSync('users.json', data);
        }
    });
    res.status(200).send('user created');
}

module.exports = {
    getAllUsers,
    getSpecificUser,
    createUser
}