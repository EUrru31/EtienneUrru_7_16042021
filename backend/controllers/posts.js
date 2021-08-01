const Post = require("../models/posts.js");

// Create and Save a new Post
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    // Create a Post
    const post = new Post({
        text: req.body.text,
        user_id: req.body.user_id,
    });

    // Save Post in the database
    Post.create(post, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while creating the Post.",
            });
        else res.send(data);
    });
};

// Retrieve all Posts from the database.
exports.findAll = (req, res) => {
    Post.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving posts.",
            });
        else res.send(data);
    });
};

// Find a single Post with a postId
exports.findOne = (req, res) => {
    Post.findById(req.params.postId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Post with id ${req.params.postId}.`,
                });
            } else {
                res.status(500).send({
                    message:
                        "Error retrieving Post with id " + req.params.postId,
                });
            }
        } else res.send(data);
    });
};

// Update a Post identified by the postId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    Post.updateById(req.params.postId, new Post(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Post with id ${req.params.postId}.`,
                });
            } else {
                res.status(500).send({
                    message: "Error updating Post with id " + req.params.postId,
                });
            }
        } else res.send(data);
    });
};
// Delete a Post with the specified postId in the request
exports.delete = (req, res) => {
    Post.remove(req.params.postId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Post with id ${req.params.postId}`,
                });
            } else {
                res.status(500).send({
                    message:
                        "Could not delete Post with id " + req.params.postId,
                });
            }
        } else res.send({ message: `Post was deleted successfully!` });
    });
};

// Delete all Posts from the database.
exports.deleteAll = (req, res) => {
    Post.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while removing all Posts.",
            });
        else res.send({ message: `All Posts were deleted successfully!` });
    });
};
// Like des postes
exports.like = async (req, res, next) => {
    const like = req.body.like;
    const userId = req.body.userId;
    const post = await Post.findOne({
        _id: req.params.id,
    });
    console.log(req.body);
    if (like === 1) {
        await likePost(post, userId);
    }
    if (like === 0) {
        await removeLike(post, userId);
    }
    res.status(200).json({});
};

async function removeLike(post, userId) {
    const updateOperation = {};
    if (post.usersLiked.includes(userId)) {
        updateOperation["$pull"] = { usersLiked: userId };
        updateOperation["$inc"] = { likes: -1 };
    }

    await Post.updateOne({ _id: post._id }, updateOperation);
}

async function likePost(sauce, userId) {
    if (sauce.usersLiked.includes(userId)) return;
    const updateOperation = {
        $push: { usersLiked: userId },
        $inc: { likes: 1 },
    };

    await Post.updateOne({ _id: post._id }, updateOperation);
}
