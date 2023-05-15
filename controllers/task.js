import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";

export const newTask = async ( req, res , next) =>{
    try {

        const { title , description } = req.body;

        const task = new Task({ title }); 
    
        await Task.create({
            title, description, user: req.user, isCompleted: false
        })
    
        res.status(201).json({
            success: true, 
            message: "Task added Successfully" ,     
        })

    } catch (error) {
        next(error);
    }
}

export const getMytask = async (req , res , next) => {
    const userid = req.user._id;

    
    const tasks = await Task.find({user:userid});

    res.status(200).json({
        success: true,
        tasks: tasks
    })
}

export const updateTask = async (req , res , next) => { 
    try {
        const task = await Task.findById(req.params.taskid);

        if(!task){
            return next(new ErrorHandler("Task not found", 404 ));
        }
    
    
        task.isCompleted = !task.isCompleted;
    
        await task.save();
    
        res.status(200).json({
            isCompleted : task.isCompleted,
            success: true,
            message: "Task Updated!",
        });
    } catch (error) {
        next(error);
    }
};

export const deleteTask = async (req , res , next) => {
    try {
        const task = await Task.findById(req.params.taskid); 


        if(!task){
            return next(new ErrorHandler("Task not found", 404 ));
        }
    
    
        await task.deleteOne();
        res.status(200).json({
            success: true,
            message: "Task Deleted",
        })

    } catch (error) {
        next(error);
    }
};