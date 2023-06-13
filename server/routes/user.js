import express from 'express';
import bcrypt from 'bcrypt';
import UserModel from '../model/User.js';
import TodoModel from '../model/Todo.js';

const router = express.Router();

router.put('/edit/:id', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const id = req.params.id;

        if(!name || !email || !password) {
            return res.status(400).json({ message: 'Please fill all the details.' });
        };

        const user = await UserModel.findById(id);

        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        };

        const hashedPassword = await bcrypt.hash(password, 10);

        await UserModel.findByIdAndUpdate(
            id,
            { name, email, password: hashedPassword },
            { new: true },
        );

        res.status(202).json({ message: 'Credentials updated successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
        console.log('Error while updating user credentials.', error);
    };
});

router.delete("/delete/:id", async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await UserModel.findById(userId);
        if(!user) {
            return res.status(404).json({ message: "User not found!" });
        };

        await UserModel.findByIdAndDelete(userId);
        await TodoModel.deleteMany({ userId });
        return res.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
        console.log('Error while updating user credentials.', error);
    };
});

export default router;
