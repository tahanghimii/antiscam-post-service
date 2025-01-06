const express = require('express');
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost
} = require('../controllers/PostController');

const {
  createComment,
  getCommentsByPost,
  deleteComment
} = require('../controllers/CommentsController');

const router = express.Router();

router.post('/posts', createPost);
router.get('/posts', getAllPosts);
router.get('/posts/:postId', getPostById);
router.put('/posts/:postId', updatePost);
router.delete('/posts/:postId', deletePost);

router.post('/posts/:postId/comments', createComment);
router.get('/posts/:postId/comments', getCommentsByPost);
router.delete('/comments/:commentId', deleteComment);

module.exports = router;
