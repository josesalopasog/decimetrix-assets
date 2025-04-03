import express from 'express';
import { 
    createUser, 
    getAllUsers, 
    loginAuthUser, 
    logoutCurrentUser,
    getUserById,
    updateUserById,
    deleteUserById,
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
    .get(authenticate, isAdmin, getAllUsers) //Get all users (only for admin) 
router
    .route('/:id') //Route for /api/users/:id
    .get(authenticate, isAdmin, getUserById) //Get the user by ID (only for admin)
    .put(authenticate, isAdmin, updateUserById) //Update the user by ID (only for admin)
    .delete(authenticate, isAdmin, deleteUserById); //Delete the user's profile (only for admin)

export default router;