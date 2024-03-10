import express from 'express';
import { followUser, unfollowUser, getFollowing, getFollowers}  from '../controllers/followController.js';
import { requireSignIn } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/follow/:id', requireSignIn, followUser);
router.post('/unfollow/:id', requireSignIn, unfollowUser);
router.get('/following/:id', requireSignIn, getFollowing);
router.get('/followers/:id', requireSignIn, getFollowers);

export default router;

