const connection = require('../database');

getAllPostsQuery = (user) => {
    const query = 'SELECT * FROM user JOIN posts ON user.Id = posts.UserId WHERE user.Id= ?';
    return new Promise((resolve, reject) => {
        connection.query(query,[user], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
                // console.log(results);
            }
        });
    });
};

getAllPosts = async (req, res) => {
    user = req.params.userId;
    // console.log(user);
    try {
        const users = await getAllPostsQuery(user);
        // console.log(users);
        var finalData = users.map(member => {
            postObj = {
                text : member.text,
                date : member.date,
                likes :member.likes
            }
            return postObj;
        })
        var final = {
            id : users[0].id,
            name : users[0].name,
            surname : users[0].surname,
            email : users[0].email,
            age : users[0].age,
            posts : finalData
        }
        res.status(200).send(final);
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