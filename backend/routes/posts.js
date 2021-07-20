const express = require("express");
const router = express.Router();

const postCtrl = require("../controllers/posts");

const posts = require("../controllers/posts.js");

// Create a new Post
router.post("/", postCtrl.create);

// Retrieve all Posts
router.get("/", postCtrl.findAll);

// Retrieve a single Post with postId
router.get("/:postId", postCtrl.findOne);

// Update a Post with postId
router.put("/:postId", postCtrl.update);

// Delete a Post with postId
router.delete("/:postId", postCtrl.delete);

// Create a new Post
router.delete("/", postCtrl.deleteAll);

module.exports = router;
