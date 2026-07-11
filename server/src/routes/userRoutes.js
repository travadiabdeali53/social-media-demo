const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  followUser,
  unfollowUser,
  getUserProfile,
  getAllUsers,
  getMyProfile
} = require("../controllers/userController");

router.put(
  "/follow/:id",
  authMiddleware,
  followUser
);

router.put(
  "/unfollow/:id",
  authMiddleware,
  unfollowUser
);

router.get(
  "/profile/:id",
  getUserProfile
);

router.get("/", getAllUsers);

router.get("/me", authMiddleware, getMyProfile);

module.exports = router;