const express = require('express');
const actions = require('./actions');

const routes = express.Router();

routes.get('/', actions.getAllPosts);
routes.get('/:id', actions.getSpecificPost);
routes.post('/', actions.createPost);
// routes.put('/:id', actions.changeUser);
// routes.patch('/:id', actions.changePartUser);
// routes.delete('/:id',actions.deleteUser);

module.exports = routes;