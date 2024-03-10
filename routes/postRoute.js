import express from 'express';
import { createPost, getPost, updatePost, deletePost}  from '../controllers/postController.js';
import { requireSignIn } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/post', requireSignIn, createPost);
router.get('/post/:id', requireSignIn, getPost);
router.put('/post/:id', requireSignIn, updatePost);
router.delete('/post/:id', requireSignIn, deletePost);

export default router;
