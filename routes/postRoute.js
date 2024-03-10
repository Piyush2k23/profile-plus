import express from 'express';
import { createPost, getPost, updatePost, deletePost}  from '../controllers/postController.js';
import { requireSignIn } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', requireSignIn, createPost);
router.get('/:postId', requireSignIn, getPost);
router.put('/:postId', requireSignIn, updatePost);
router.delete('/:postId', requireSignIn, deletePost);

export default router;
