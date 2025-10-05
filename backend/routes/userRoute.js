import express from 'express';
import { loginUser, registerUser, adminLogin } from '../controllers/userController.js';

// Create a new Express router instance
const userRouter = express.Router();

/*
  @route   POST /api/user/register
  @desc    Register a new user
  @access  Public
*/
userRouter.post('/register', registerUser);

/*
  @route   POST /api/user/login
  @desc    Login existing user
  @access  Public
*/
userRouter.post('/login', loginUser);

/*
  @route   POST /api/user/admin
  @desc    Login admin user
  @access  Restricted (admin only)
*/
userRouter.post('/admin', adminLogin);

// Export the router to use in server.js
export default userRouter;
