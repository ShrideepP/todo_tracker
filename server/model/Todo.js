import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    completed: { type: Boolean, required: true, default: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const TodoModel = mongoose.model('todo', todoSchema);

export default TodoModel;
