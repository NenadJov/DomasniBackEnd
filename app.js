const express = require('express');
var bodyParser = require('body-parser');
const fs = require('fs');
// const users = require('./users/routes');
// const posts = require('./posts/routes');
const appRouter = require('./router');
const middleware = require('./middlewares/common');
require('dotenv/config');

const app = express();

app.use(middleware.logger);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use('/users', users);
// app.use('/posts', posts);
app.use(appRouter);

// let user = {
//     name: 'Nenad',
//     surname: 'Jovceski',
//     email: 'nenad@gmail.com',
//     age: 42,
//     isActive: true
// };

// app.get('/write', (req, res) => {
//     let data = JSON.stringify(user, null, 2);
//     fs.writeFileSync('dat.json', data);
//     res.send(user);
//     // console.log(user);
// });

// app.get('/read', (req, res) => {
//     let rawdata = fs.readFileSync('dat.json');
//     let user = JSON.parse(rawdata);
//     res.send(user);
//     // console.log(user);
// });

app.use(middleware.errRoute);

app.use(middleware.errHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on ${PORT}`));
