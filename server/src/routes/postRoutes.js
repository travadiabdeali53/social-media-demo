const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createPost,
  getAllPosts,
  deletePost,
  likePost,
  getPostById
} = require("../controllers/postController");

router.post("/", authMiddleware, createPost);

router.get("/", getAllPosts);

router.delete("/:id", authMiddleware, deletePost);

router.put("/like/:id", authMiddleware, likePost);

router.get("/:id", getPostById);

module.exports = router;