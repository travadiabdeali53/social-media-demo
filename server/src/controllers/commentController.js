const Comment = require("../models/Comment");
const Post = require("../models/Post");


// Add Comment
exports.addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const { postId } = req.params;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post Not Found",
      });
    }

    const comment = await Comment.create({
      user: req.user.id,
      post: postId,
      text,
    });

    res.status(201).json({
      success: true,
      message: "Comment Added",
      comment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({
      post: req.params.postId,
    })
      .populate("user", "username profilePic")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      comments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment Not Found",
      });
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not Authorized",
      });
    }

    await comment.deleteOne();

    res.status(200).json({
      success: true,
      message: "Comment Deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};