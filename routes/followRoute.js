import express from 'express';
import { followUser, unfollowUser, getFollowing, getFollowers}  from '../controllers/postController';
import { requireSignIn } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/follow/:userId', requireSignIn, followUser);
router.post('/unfollow/:userId', requireSignIn, unfollowUser);
router.get('/following/:userId', requireSignIn, getFollowing);
router.get('/followers/:userId', requireSignIn, getFollowers);

export default router;

