const Post = require('../models/Post');

const PostController = {
  async createPost(req, res) {
    try {
      const { content, mediaUrl } = req.body;
      const { username, firstName, lastName, avatarURL } = req.user;

      const post = new Post({
        content,
        mediaUrl,
        username,
        firstName,
        lastName,
        avatarURL,
      });
      await post.save();

      res.status(201).json(post);
    } catch (error) {
      res.status(500).json({ message: 'Error creating post', error });
    }
  },

  async getAllPosts(req, res) {
    try {
      const { username } = req.user;
      const posts = await Post.find({ username }).sort({ createdAt: -1 });
  
      res.status(200).json({ posts });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user posts', error });
    }
  },

  async getPostById(req, res) {
    try {
      const { postId } = req.params;

      const post = await Post.findById(postId).populate('comments');
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching post', error });
    }
  },

  async updatePost(req, res) {
    try {
      const { postId } = req.params;
      const { content, mediaUrl } = req.body;

      const post = await Post.findByIdAndUpdate(
        postId,
        { content, mediaUrl, updatedAt: Date.now() },
        { new: true }
      );

      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ message: 'Error updating post', error });
    }
  },

  async deletePost(req, res) {
    try {
      const { postId } = req.params;

      const post = await Post.findByIdAndDelete(postId);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      await Comment.deleteMany({ _id: { $in: post.comments } });

      res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting post', error });
    }
  }
};

module.exports = PostController;
