import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import todoRoutes from './routes/todo.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/todo', todoRoutes);

mongoose.connect(process.env.MONGODB_DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        app.listen(3000, () => {
            console.log(`Database connected successfully and server started on PORT: ${3000}`);
        });
    })
    .catch((error) => {
        console.log(`Error while connecting to the database`, error);
    });
