const Post = require("../models/Post");


// Create Post
exports.createPost = async (req, res) => {
  try {
    const { content, image } = req.body;

    const post = await Post.create({
      user: req.user.id,
      content,
      image,
    });

    res.status(201).json({
      success: true,
      message: "Post Created Successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Get All Posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "username profilePic")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: posts.length,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Delete Post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post Not Found",
      });
    }

    if (post.user.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not Authorized",
      });
    }

    await post.deleteOne();

    res.status(200).json({
      success: true,
      message: "Post Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post Not Found",
      });
    }

    const alreadyLiked = post.likes.includes(req.user.id);

    if (alreadyLiked) {
      post.likes = post.likes.filter(
        (id) => id.toString() !== req.user.id
      );

      await post.save();

      return res.status(200).json({
        success: true,
        message: "Post Unliked",
      });
    }

    post.likes.push(req.user.id);

    await post.save();

    res.status(200).json({
      success: true,
      message: "Post Liked",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("user", "username profilePic");

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      post,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};