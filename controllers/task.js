import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";

export const createTask = async (req, res, next) => {
    
    try {
        const {title,description} = req.body;
        await Task.create({
            title,
            description,
            user : req.user,
            // task: req.body // Assuming the task details are sent in the request body
        });

        res.status(201).json({
        success: true,
        message: "Task created successfully",
        });
    } catch (error) {
        next(new ErrorHandler(error.message)); // If an error occurs, pass it to the next middleware    
    }
}

export const getAllTask = async (req, res, next) => {
    
    try {
        const userId = req.user._id;
        const tasks = await Task.find({ user: userId });
        res.status(200).json({
            success: true,
            tasks,
        });
    } catch (error) {
        next(new ErrorHandler(error.message)); // If an error occurs, pass it to the next middleware 
    }
};

export const updateTask = async (req, res, next) => {

    try {
        const { id } = req.params;
        const task = await Task.findById(id);
        
        if (!task) {
            return next(new ErrorHandler("Task not found", 404)); // If task not found, pass error to next middleware
        }

        task.isCompleted = !task.isCompleted; // Toggle the completion status
        await task.save(); // Save the updated task
        res.status(200).json({
            success: true,
            message: "Task updated successfully",
        });
    } catch (error) {
        next(new ErrorHandler(error.message)); // If an error occurs, pass it to the next middleware
    }
};

export const deleteTask = async (req, res, next) => {
    
    try {
        const { id } = req.params;
        const task = await Task.findById(id);
        if (!task) {
            return next(new ErrorHandler("Task not found",404)); // If task not found, pass error to next middleware
        }
    
        await task.deleteOne(); // Delete the task
        res.status(200).json({
            success: true,
        });
    } catch (error) {
        next(new ErrorHandler(error.message)); // If an error occurs, pass it to the next middleware
    }
};