import express from 'express';
// import {User} from '../models/user.js'; // Assuming you have a User model defined in models/user.js
import { getAllUsers, createUser, specialUser, getUserById, updateUserById, deleteUserById, login, getMyProfile, logout } from '../controllers/user.js';
import { isAuthenticated } from '../middlewares/auth.js'; // Assuming you have an authentication middleware defined in middlewares/auth.js

const router = express.Router();

router.get('/all', getAllUsers);   
router.post('/create', createUser);    
router.post('/login', login);
router.get('/logout', logout);
router.get('/me', isAuthenticated, getMyProfile);

// router.get('/userid/special', specialUser);    
// creating three different routes for the same endpoint or we can just use the other method
// router.route('/userid/:id')
//     .get(getUserById)
//     .put(updateUserById)
//     .delete(deleteUserById);

// Dynamic route ko end me rakhna if you want to create a route for userid/special keep it above the one bellow this comment 
router.get('/userid/:id', getUserById);
router.put('/userid/:id', updateUserById);
router.delete('/userid/:id', deleteUserById);


export default router;