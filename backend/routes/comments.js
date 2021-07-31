const express = require("express");
const router = express.Router();

const commentCtrl = require("../controllers/comments");

const comments = require("../controllers/comments.js");

// Create a new comment
router.post("/", commentCtrl.create);

// Retrieve all comments
router.get("/", commentCtrl.findAll);
router.get("/postid/:postId", commentCtrl.findByPostId);

// Retrieve a single comment with postId
router.get("/:commentId", commentCtrl.findOne);

// Update a comment with postId
router.put("/:commentId", commentCtrl.update);

// Delete a comment with postId
router.delete("/:commentId", commentCtrl.delete);

// Create a new comment
router.delete("/", commentCtrl.deleteAll);

module.exports = router;
