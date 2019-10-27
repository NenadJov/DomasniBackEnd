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

createPostQuery = (text,likes) => {
    const query = 'INSERT INTO posts (Text, Likes, CreatedOn) VALUES (?, ?, now())';
    return new Promise((resolve, reject) => {
        connection.query(query, [text, likes], (error, results, fields) => {
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

    try {
        const post = await createPostQuery(postText, postLikes);
        res.status(200).send(post);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    getAllPosts,
    getSpecificPost,
    createPost,
}