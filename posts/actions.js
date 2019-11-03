const connection = require('../database');

getAllPostsQuery = () => {
    const query = 'SELECT * FROM posts';
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

getAllPosts = async (req, res) => {
    try {
        const posts = await getAllPostsQuery();
        res.status(200).send(posts);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

getSpecificPostQuery = (postId) => {
    const query = 'SELECT * FROM posts WHERE Id = ?';
    return new Promise((resolve, reject) => {
        connection.query(query, [postId], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

getSpecificPost = async (req, res, next) => {
    const postId = req.params.id;
    try {
        const post = await getSpecificPostQuery(postId);
        res.status(200).send(post[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

createPostQuery = (text, likes, userId) => {
    const query = 'INSERT INTO posts (Text, Likes, CreatedOn, UserId) VALUES (?, ?, now(), ?)';
    return new Promise((resolve, reject) => {
        connection.query(query, [text, likes, userId], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

createPost = async (req, res, next) => {
    const postText = req.body.text;
    const postLikes = req.body.likes;
    const postUserId = req.body.userId

    try {
        const post = await createPostQuery(postText, postLikes, postUserId);
        res.status(200).send("post is created with id " + post.insertId);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

updatePostQuery = (id, post) => {
    const query = 'UPDATE posts SET Text = ?, Likes = ?, CreatedOn = now() WHERE Id = ?';
    return new Promise((resolve, reject) => {
        connection.query(query, [post.text, post.likes, id], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

updatePost = async (req, res, next) =>{
    const postRequest = req.body;
    const postId = req.params.postId;
    try {
        const post = await updatePostQuery(postId, postRequest);
        res.status(200).send(post); //"post is updated with id " + post);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    getAllPosts,
    getSpecificPost,
    createPost,
    updatePost,
}