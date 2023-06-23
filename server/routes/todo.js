import express from 'express';
import UserModel from '../model/User.js';
import TodoModel from '../model/Todo.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/all/:userId', verifyToken, async (req, res) => {
    try {
        const userId = req.params.userId;

        const user = await UserModel.findById(userId);
        if(!user) {
            return res.status(404).json({ message: 'User not found.' });
        };

        const todos = await TodoModel.find({ userId });
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
        console.log('Error while getting all todos.', error);  
    };
});

router.get('/completed/:userId', verifyToken, async (req, res) => {
    try {
        const userId = req.params.userId;

        const user = await UserModel.findById(userId);
        if(!user) {
            return res.status(404).json({ message: 'User not found.' });
        };

        const todos = await TodoModel.find({ userId, completed: true });
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
        console.log('Error while getting completed todos.', error);  
    };
});

router.get('/active/:userId', verifyToken, async (req, res) => {
    try {
        const userId = req.params.userId;

        const user = await UserModel.findById(userId);
        if(!user) {
            return res.status(404).json({ message: 'User not found.' });
        };

        const todos = await TodoModel.find({ userId, completed: false });
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
        console.log('Error while getting active todos.', error);  
    };
});

router.post('/create/:userId', verifyToken, async (req, res) => {
    try {
        const userId = req.params.userId;
        const { title } = req.body;

        const user = await UserModel.findById(userId);
        if(!user) {
            return res.status(404).json({ message: 'User not found.' });
        };

        const todo = new TodoModel({ title, userId });
        await todo.save();
        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
        console.log('Error while creating a todo.', error);  
    };
});

router.patch('/update/:todoId', verifyToken, async (req, res) => {
    try {
        const todoId = req.params.todoId;
        const { completed } = req.body;
        
        const todo = await TodoModel.findById(todoId);
        if(!todo) {
            return res.status(404).json({ message: 'Todo not found.' });
        };

        if(completed === undefined) {
            return res.status(400).json({ message: 'Please fill all the details.' });
        };

        await TodoModel.findByIdAndUpdate(todoId, { completed });
        res.status(200).json({ message: 'Todo updated successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
        console.log('Error while updating a todo.', error); 
    };
});

router.delete('/delete/:todoId', verifyToken, async (req, res) => {
    try {
        const todoId = req.params.todoId;

        const todo = await TodoModel.findById(todoId);
        if(!todo) {
            return res.status(404).json({ message: 'Todo not found.' });
        };

        await TodoModel.findByIdAndDelete(todoId);
        res.status(200).json({ message: 'Todo deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
        console.log('Error while deleting a todo.', error); 
    };
});

router.delete('/delete/completed/:userId', verifyToken, async (req, res) => {
    try {
        const userId = req.params.userId;

        const user = await UserModel.findById(userId);
        if(!user) {
            return res.status(404).json({ message: 'User not found.' });
        };

        await TodoModel.deleteMany({ userId, completed: true });
        res.status(200).json({ message: 'Todos deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
        console.log('Error while deleting completed todos.', error); 
    };
});

export default router;
