const express = require("express");
const router = express.Router();

const postCtrl = require("../controllers/posts");

router.post("/signup", postCtrl.signup);
router.post("/login", postCtrl.login);

const posts = require("../controllers/posts.js");

// Create a new Post
router.post("/posts", postCtrl.create);

// Retrieve all Posts
router.get("/posts", postCtrl.findAll);

// Retrieve a single Post with postId
router.get("/posts/:postId", postCtrl.findOne);

// Update a Post with postId
router.put("Post/posts/:postId", postCtrl.update);

// Delete a Post with postId
router.delete("/posts/:postId", postCtrl.delete);

// Create a new Post
router.delete("/posts", postCtrl.deleteAll);

module.exports = router;
