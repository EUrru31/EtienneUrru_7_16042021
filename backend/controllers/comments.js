const Comment = require("../models/comments.js");

// Create and Save a new comment
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    // Create a comment
    const comment = new Comment({
        text: req.body.text,
        user_id: req.body.user_id,
        posts_id: req.body.posts_id,
    });

    // Save comment in the database
    Comment.create(comment, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while creating the comment.",
            });
        else res.send(data);
    });
};

// Retrieve all comments from the database.
exports.findAll = (req, res) => {
    Comment.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving comments.",
            });
        } else res.send(data);
    });
};

exports.findByPostId = (req, res) => {
    Comment.findByPostId(req.params.postId, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving comments.",
            });
        } else res.send(data);
    });
};

// Find a single comment with a commentId
exports.findOne = (req, res) => {
    Comment.findById(req.params.commentId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Comment with id ${req.params.commentId}.`,
                });
            } else {
                res.status(500).send({
                    message:
                        "Error retrieving Comment with id " +
                        req.params.commentId,
                });
            }
        } else res.send(data);
    });
};

// Update a comment identified by the commentId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    Comment.updateById(
        req.params.commentId,
        new Comment(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Comment with id ${req.params.commentId}.`,
                    });
                } else {
                    res.status(500).send({
                        message:
                            "Error updating Comment with id " +
                            req.params.commentId,
                    });
                }
            } else res.send(data);
        }
    );
};
// Delete a comment with the specified commentId in the request
exports.delete = (req, res) => {
    Comment.remove(req.params.commentId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Comment with id ${req.params.commentId}.`,
                });
            } else {
                res.status(500).send({
                    message:
                        "Could not delete Comment with id " +
                        req.params.commentId,
                });
            }
        } else res.send({ message: `Comment was deleted successfully!` });
    });
};

// Delete all comments from the database.
exports.deleteAll = (req, res) => {
    Comment.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while removing all Comments.",
            });
        else res.send({ message: `All Comments were deleted successfully!` });
    });
};
