const express = require('express');
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,likePost,dislikePost,addComment,editComment,deleteComment
} = require('../controllers/PostController');

const {
  createComment,
  getCommentsByPost,
  
} = require('../controllers/CommentsController');

const router = express.Router();

router.post('/posts', createPost);
router.get('/posts', getAllPosts);
router.get('/posts/:postId', getPostById);
router.put('/posts/:postId', updatePost);
router.delete('/posts/:postId', deletePost);
router.post('/posts/:postId/like', likePost);
router.post('/posts/:postId/dislike', dislikePost);

router.post('/posts/:postId/comments', addComment);
router.get('/posts/:postId/comments', getCommentsByPost);
router.delete('/posts/:postId/comments/:commentId', deleteComment);
router.put('/posts/:postId/comments/:commentId', editComment);


module.exports = router;
