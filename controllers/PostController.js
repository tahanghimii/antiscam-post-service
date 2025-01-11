const Post = require('../models/Post');
const Comment  = require('../models/Comment');

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
  },

  async likePost(req, res) {
    try {
      const { postId } = req.params;
      const { firstName, lastName, username, avatarURL } = req.user;
  
      // Find the post by ID
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      // Check if the user has already liked the post
      const alreadyLiked = post.likes.likedBy.some(user => user.username === username);
      if (alreadyLiked) {
        return res.status(400).json({ message: 'You have already liked this post' });
      }
  
      // Check if the user has disliked the post; remove from dislikedBy if present
      post.likes.dislikedBy = post.likes.dislikedBy.filter(user => user.username !== username);
  
      // Add the user to the likedBy array and increment likeCount
      post.likes.likedBy.push({ firstName, lastName, username, avatarURL });
      post.likes.likeCount += 1;
  
      // Save the updated post
      await post.save();
  
      return res.status(201).json({ message: 'Post liked successfully', post });
    } catch (error) {
      console.error('Error liking post:', error);
      return res.status(500).json({ message: 'Error liking post', error });
    }
  },
  async dislikePost(req, res) {
    try {
      const { postId } = req.params;
      const { firstName, lastName, username, avatarURL } = req.user;
  
      // Find the post by ID
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      // Check if the user has already disliked the post
      const alreadyDisliked = post.likes.dislikedBy.some(user => user.username === username);
      if (alreadyDisliked) {
        return res.status(400).json({ message: 'You have already disliked this post' });
      }
  
      // Check if the user has liked the post; remove from likedBy if present
      const wasLiked = post.likes.likedBy.some(user => user.username === username);
      if (wasLiked) {
        post.likes.likedBy = post.likes.likedBy.filter(user => user.username !== username);
        post.likes.likeCount -= 1; // Decrement likeCount
      }
  
      // Add the user to the dislikedBy array
      post.likes.dislikedBy.push({ firstName, lastName, username, avatarURL });
  
      // Save the updated post
      await post.save();
  
      return res.status(201).json({ message: 'Post disliked successfully', post });
    } catch (error) {
      console.error('Error disliking post:', error);
      return res.status(500).json({ message: 'Error disliking post', error });
    }
  },

  async addComment(req, res) {
    try {
      const { postId } = req.params;
      const { firstName, lastName, username, avatarURL } = req.user; // User data from authentication
      const { commentData } = req.body;
  
      // Ensure the commentData has 'text' field
      if (!commentData || !commentData.text) {
        return res.status(400).json({ message: 'No comment data provided or missing required fields' });
      }
  
      const { text } = commentData;
  
      // Find the post by postId
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      // Ensure the post has a comments array initialized
      if (!post.comments) {
        post.comments = [];  // Initialize the comments array if it doesn't exist
      }
  
      // Create a new comment
      const newComment = {
        firstName,
        lastName,
        username,
        avatarURL,
        text,
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
        createdAt: new Date(),
      };
  
      // Save the new comment directly in the post's comments array
      post.comments.push(newComment);
  
      // Save the updated post with the new comment
      await post.save();
  
      return res.status(201).json({
        message: 'Comment added successfully',
        post,

      });
    } catch (error) {
      console.error('Error adding comment:', error);
      return res.status(500).json({ message: 'Error adding comment', error: error.message || error });
    }
  },
  
  // Edit a comment
  async editComment(req, res) {
    try {
      const { postId, commentId } = req.params;
      const { firstName, lastName, username, avatarURL, text } = req.body; // Accepting all fields
  
      // Find the post by postId
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      // Find the comment by commentId using findIndex to avoid issues with plain JavaScript objects
      const commentIndex = post.comments.findIndex(comment => comment._id.toString() === commentId);
      if (commentIndex === -1) {
        return res.status(404).json({ message: 'Comment not found' });
      }
  
      // Update the comment's fields
      post.comments[commentIndex].firstName = firstName || post.comments[commentIndex].firstName;
      post.comments[commentIndex].lastName = lastName || post.comments[commentIndex].lastName;
      post.comments[commentIndex].username = username || post.comments[commentIndex].username;
      post.comments[commentIndex].avatarURL = avatarURL || post.comments[commentIndex].avatarURL;
      post.comments[commentIndex].text = text || post.comments[commentIndex].text;
  
      // Save the updated post
      await post.save();
  
      return res.status(200).json({
        message: 'Comment updated successfully',
        post,
        updatedComment: post.comments[commentIndex],
      });
    } catch (error) {
      console.error('Error editing comment:', error);
      return res.status(500).json({ message: 'Error editing comment', error: error.message || error });
    }
  },
  
  
// Delete a comment
async deleteComment(req, res) {
  try {
    const { postId, commentId } = req.params;

    // Find the post by postId
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Find the comment by commentId
    const commentIndex = post.comments.findIndex(comment => comment._id.toString() === commentId);
    if (commentIndex === -1) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Remove the comment from the comments array
    post.comments.splice(commentIndex, 1);

    // Save the updated post
    await post.save();

    return res.status(200).json({
      message: 'Comment deleted successfully',
      post,
    });
  } catch (error) {
    console.error('Error deleting comment:', error);
    return res.status(500).json({ message: 'Error deleting comment', error: error.message || error });
  }
}

  
};

module.exports = PostController;
