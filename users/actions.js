const fs = require('fs');
const path = require('path');
const connection = require('../database');

getAllUsersQuery = () => {
    const query = 'SELECT * FROM user';
    return new Promise((resolve, reject) => {
        connection.query(query, (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

getAllUsers = async (req, res) => {
    // res.status(200).send(JSON.parse(fs.readFileSync('users.json')));
    try {
        const users = await getAllUsersQuery();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

getSpecificUserQuery = (userId) => {
    const query = 'SELECT * FROM user WHERE Id = ?';
    return new Promise((resolve, reject) => {
        connection.query(query, [userId], (error, results, fields) =>{
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};
getSpecificUser = async (req, res, next) => {
    const userId = req.params.id;

    if(userId <= 0){
        var error = new Error('id can not be less than 0!');
        error.status = 403;
        next(error);
    }
    try {
        const user = await getSpecificUserQuery(userId);
        res.status(200).send(user[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
    // let rawdata = fs.readFileSync('users.json');
    // let users = JSON.parse(rawdata);

    // if (req.params.id == 0) {
    //     var error = new Error("id can not be 0!!!");
    //     error.status = 403;
    //     next(error);
    // } else {
    //     let currentUser = users.filter((x) => {
    //         return x.id == req.params.id;
    //     });
    //     res.status(200).send(currentUser[0]);
    // }
};

createUserQuery = (name,surname,email,age,isActive) => {
    const query = 'INSERT INTO user (Name, Surname, Email, Age, IsActive) VALUES (?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
        connection.query(query, [name, surname, email, age, isActive], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

createUser = async (req, res, next) => {
    const userName = req.body.name;
    const userSurname = req.body.surname;
    const userEmail = req.body.email;
    const userAge = req.body.age;
    const userIsActive = req.body.isActive;

    try {
        const user = await createUserQuery(userName, userSurname, userEmail, userAge, userIsActive);
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
    // let rawdata = fs.readFileSync('users.json');
    // let users = JSON.parse(rawdata);
    // users.forEach(member => {
    //     if (member.id == req.body.id) {
    //         var error = new Error("id already exist!!!");
    //         error.status = 409;
    //         next(error);
    //     } else {
    //         users.push(req.body);
    //         let data = JSON.stringify(users, null, 2);
    //         fs.writeFileSync('users.json', data);
    //     }
    // });
    // res.status(200).send('user created');
}

changeUser = (req, res) => {
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
};

changePartUser = (req, res) => {
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
};

deleteUser = (req, res) => {
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
};

module.exports = {
    getAllUsers,
    getSpecificUser,
    createUser,
    changeUser,
    changePartUser,
    deleteUser
}