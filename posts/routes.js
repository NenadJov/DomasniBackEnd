const express = require('express');
const actions = require('./actions');

const routes = express.Router();

routes.get('/users/:userId/posts', actions.getAllPosts);
routes.get('/users/:userId/posts/:postId', actions.getSpecificPost);
routes.post('/users/:userId/posts', actions.createPost);
// routes.put('/:id', actions.changeUser);
// routes.patch('/:id', actions.changePartUser);
// routes.delete('/:id',actions.deleteUser);

module.exports = routes;