const fs = require('fs');
const path = require('path');
const connection = require('../database');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

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

createUserQuery = (name,surname,email,age,isActive,pass) => {
    const query = 'INSERT INTO user (Name, Surname, Email, Age, IsActive, Password) VALUES (?, ?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
        connection.query(query, [name, surname, email, age, isActive, pass], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

createUser = async (req, res, next) => {
    const userName = req.body.Name;
    const userSurname = req.body.Surname;
    const userEmail = req.body.Email;
    const userAge = req.body.Age;
    const userIsActive = req.body.IsActive;
    const userPassword = req.body.Password;
    console.log(userPassword);

    try {
        const passHash = bcrypt.hashSync(userPassword, 10);
        const user = await createUserQuery(userName, userSurname, userEmail, userAge, userIsActive, passHash);
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

changeUserQuery = (id, user) => {
    const query = 'UPDATE user SET Name = ?, Surname = ?, Email = ?, Age = ?, IsActive = ? WHERE Id = ?';
    return new Promise((resolve, reject) => {
        connection.query(query, [user.name, user.surname, user.email, user.age, user.isActive, id], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                console.log(results);
                if (results.affectedRows == 0) {
                    reject("nema user so takvo id")
                } else {
                    resolve(results);
                }
            }
        });
    });
};

changeUser = async (req, res, next) => {
    const user = req.body;
    const id = req.params.id;
    try {
        const users = await changeUserQuery(id, user);
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
    // let rawdata = fs.readFileSync('users.json');
    // let users = JSON.parse(rawdata);
    // users.forEach(member => {
    //     if (member.id == req.params.id) {
    //         return users.splice(users.indexOf(member), 1, req.body);
    //     };
    // });
    // let data = JSON.stringify(users, null, 2);
    // fs.writeFileSync('users.json', data);
    // res.status(200).send("Full update for user with id = " + req.params.id);
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

getUserByEmailQuery = (email) => {
    const query = 'SELECT * FROM user WHERE Email = ?';
    return new Promise((resolve, reject) => {
        connection.query(query, [email], (error, results, fields) =>{
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

loginUser = async (req, res) =>{
    const email = req.body.Email;
    const pass = req.body.Password;
    // console.log(pass);
    try {
        var user = await getUserByEmailQuery(email);
        var dbUser = user[0];
        const matchPass = bcrypt.compareSync(pass, dbUser.Password);
        if (matchPass) {
            const token = jwt.sign({dbUser}, 'aaaa', { expiresIn: '1h'});
            res.status(200).send(token);
        } else {
            res.status(401).send('wrong pass');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}
module.exports = {
    getAllUsers,
    getSpecificUser,
    createUser,
    changeUser,
    changePartUser,
    deleteUser,
    loginUser
}