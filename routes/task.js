import express from 'express';
import {createTask, getAllTask, updateTask, deleteTask} from '../controllers/task.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.post('/new',isAuthenticated, createTask);
router.get('/my',isAuthenticated, getAllTask);
router.route('/:id')
    .put(isAuthenticated, updateTask)
    .delete(isAuthenticated, deleteTask);
    
export default router;