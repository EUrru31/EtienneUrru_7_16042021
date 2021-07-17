const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const postsCtrl = require("../controllers/posts");

router.get("/", auth, postsCtrl.getAllPosts);
router.post("/", auth, multer, postsCtrl.createPosts);
router.get("/:id", auth, postsCtrl.getOnePosts);
router.put("/:id", auth, multer, postsCtrl.modifyPosts);
router.delete("/:id", auth, postsCtrl.deletePosts);
router.post("/:id/like", auth, postsCtrl.likeDislike);

module.exports = router;
