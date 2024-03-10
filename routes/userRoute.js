import express from 'express';
import { login, logout, register, test } from '../controllers/userController.js';
import { requireSignIn } from '../middlewares/authMiddleware.js';

const router = express.Router();


//Register route
router.post('/register', register);

//Login route
router.post('/login', login);

//Logout route
router.get('/logout', logout);

router.get('/test', requireSignIn, test);


export default router;