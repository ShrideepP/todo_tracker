import express from 'express';
import TodoModel from '../model/Todo.js';
import UserModel from '../model/User.js';

const router = express.Router();

router.get('/:userId', async (req, res) => {
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
        console.log('Error while updating user credentials.', error);
    };
});

router.post('/create/:userId', async (req, res) => {
    try {
        const { title } = req.body;
        const userId = req.params.userId;

        if(!title) {
            return res.status(400).json({ message: 'Please add a title.' });
        };
        
        const user = await UserModel.findById(userId);
        if(!user) {
            return res.status(404).json({ message: 'User not found.' });
        };
        
        const todo = new TodoModel({
            title,
            userId
        });

        await todo.save();
        res.status(201).json({ message: 'Todo created successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
        console.log('Error while updating user credentials.', error);
    };
});

router.patch('/completed/:todoId', async (req, res) => {
    try {
        const { todoId } = req.params;
        const { completed } = req.body;

        const todo = await TodoModel.findById(todoId);
        if(!todo) {
            return res.status(404).json({ message: 'Todo not found.' });
        };

        if(!completed === false) {
            return res.status(400).json({ message: 'Todo status cannot be empty.' })
        };

        await TodoModel.updateOne(
            { _id: todoId },
            { completed },
        );
        res.status(202).json({ message: 'Todo updated successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
        console.log('Error while updating user credentials.', error);
    };
});

router.get('/completed/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await UserModel.findById(userId);
        if(!user) {
            return res.status(404).json({ message: 'User not found.' });
        };

        const todos = await TodoModel.find({ userId, completed: true });
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
        console.log('Error while updating user credentials.', error);
    };
});

router.get('/active/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await UserModel.findById(userId);
        if(!user) {
            return res.status(404).json({ message: 'User not found.' });
        };

        const todos = await TodoModel.find({ userId, completed: false });
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
        console.log('Error while updating user credentials.', error);
    };
});

router.delete('/delete/:todoId', async (req, res) => {
    try {
        const { todoId } = req.params;

        const todo = await TodoModel.findById(todoId);
        if(!todo) {
            res.status(404).json({ message: "Todo does not exists!" });
        };

        await TodoModel.findByIdAndDelete(todoId);
        res.status(200).json({ message: "Todo deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
        console.log('Error while updating user credentials.', error);
    };
});

export default router;
