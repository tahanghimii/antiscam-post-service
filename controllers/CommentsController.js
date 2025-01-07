const Post = require('../models/Post');
const Comment = require('../models/Comment');

const CommentsController = {
  // Create a new comment and associate it with a post
  async createComment(req, res) {
    try {
      const { postId, firstName, lastName, username, avatarURL, text } = req.body;

      const comment = new Comment({ firstName, lastName, username, avatarURL, text });
      await comment.save();

      // Add the comment to the specified post
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      post.comments.push(comment);
      await post.save();

      res.status(201).json(comment);
    } catch (error) {
      res.status(500).json({ message: 'Error creating comment', error });
    }
  },

  // Get all comments for a specific post
  async getCommentsByPost(req, res) {
    try {
      const { postId } = req.params;
      const post = await Post.findById(postId).populate('comments');
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.status(200).json(post.comments);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching comments', error });
    }
  },

  // Delete a comment
  async deleteComment(req, res) {
    try {
      const { commentId } = req.params;

      const comment = await Comment.findByIdAndDelete(commentId);
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }

      // Remove the comment from its associated post
      await Post.updateMany({}, { $pull: { comments: { _id: commentId } } });

      res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting comment', error });
    }
  }
};

module.exports = CommentsController;
