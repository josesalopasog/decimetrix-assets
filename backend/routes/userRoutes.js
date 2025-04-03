import express from 'express';
import { 
    createUser, 
    loginAuthUser, 
    logoutCurrentUser
} from '../controllers/userController.js';

import { authenticate, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router(); //Create a new router

router
    .route('/') //Route for /api/users

router.post('/login', loginAuthUser); //Login with authenticated user
router.post('/logout', logoutCurrentUser); //Logout the current user


//--- ADMIN ROUTES ⬇️ ---
router
    .route('/')
    .post(authenticate, isAdmin, createUser) //Create a new user just for admin

export default router;