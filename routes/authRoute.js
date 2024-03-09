import express from 'express';
import { login, logout, register } from '../controllers/authController.js';

const router = express.Router();


//Register route
router.post('/register', register);

//Login route
router.post('/login', login);

//Logout route
router.get('/logout', logout);


export default router;