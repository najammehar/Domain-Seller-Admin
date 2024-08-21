import express from 'express';
import { register, login, logout, checkAuth } from '../controller/auth.controller.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/check-auth',verifyToken ,checkAuth);

export default router;