import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useCookies } from 'react-cookie';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { BsCheck } from 'react-icons/bs';
import { TfiClose } from 'react-icons/tfi';
import { BASE_URL } from '../constants';
import { toast } from 'react-hot-toast';
import axios from 'axios';

interface Todo {
    _id: string;
    title: string;
    completed: boolean;
};

interface TodoItemsProps {
    data: Todo[]
    isLoading: boolean
};

const TodoItems = ({ data, isLoading } : TodoItemsProps) => {

    const [cookies, _] = useCookies(["access_token"]);

    const queryClient = useQueryClient();

    const [updateLoading, setUpdateLoading] = useState<string[]>([]);

    const [deleteLoading, setDeleteLoading] = useState<string[]>([]);

    const updateTodo = async (data: { todoId: string, completed: boolean }) => {
        const response = await axios.patch(`${BASE_URL}/api/todo/update/${data.todoId}`, { completed: data.completed }, {
            headers: { 'Authorization': `Bearer ${cookies.access_token}` },
        });
        return response.data;
    };

    const deleteTodo = async (todoId: string) => {
        const response = await axios.delete(`${BASE_URL}/api/todo/delete/${todoId}`, {
            headers: { 'Authorization': `Bearer ${cookies.access_token}` },
        });
        return response.data;
    };

    const updateMutation = useMutation(updateTodo, {
        onSuccess: () => {
            queryClient.invalidateQueries('todos');
        },
    });

    const deleteMutation = useMutation(deleteTodo, {
        onSuccess: () => {
            queryClient.invalidateQueries('todos');
        },
    });

    const handleUpdatingTodo = async (todoId: string, completed: boolean) => {
        try {
            setUpdateLoading((prevLoading) => [...prevLoading, todoId]);
            await updateMutation.mutateAsync({ todoId, completed });
            toast.success('Todo updated successfully');
        } catch (error) {
            toast.error('Error while updating the todo');
        } finally {
            setUpdateLoading((prevLoading) => prevLoading.filter((id) => id !== todoId));
        };
    };

    const handleDeleteTodo = async (todoId: string) => {
        try {
            setDeleteLoading((prevLoading) => [...prevLoading, todoId]);
            await deleteMutation.mutateAsync(todoId);
            toast.success('Todo deleted successfully');
        } catch (error) {
            toast.error('Oops! something went wrong.');  
        } finally {
            setDeleteLoading((prevLoading) => prevLoading.filter((id) => id !== todoId));
        };
    };

    return (
        <div className="w-full space-y-2">
            {isLoading ? (
                <h2>...Loading</h2>
            ) : (
                data?.map((todo: Todo) => (
                    <div key={todo._id} id='todo' style={{border: '1px solid rgba(255,255,255,.06)'}} className="w-full min-h-[3rem] pl-2 pr-4 text-compliment hover:text-dominant flex items-center gap-x-4 rounded-full">
                        <button onClick={() => handleUpdatingTodo(todo._id, !todo.completed)} type="button" style={{ border: '1px solid transparent', background: 'linear-gradient(#0A0A0A, #0A0A0A) padding-box, linear-gradient(to top right, #C445D5, #FE8E8B) border-box' }} className="w-8 h-8 grid place-items-center rounded-full">
                            {updateLoading.includes(todo._id) ? (
                                <AiOutlineLoading3Quarters size={16} color="#F5F5F5" className="animate-spin" />
                            ) : (
                                todo.completed ? <BsCheck size={20} /> : null
                            )}
                        </button>
                        <p className={`flex-1 text-sm font-medium ${todo.completed && 'line-through'} tracking-wide`}>
                            {todo.title}
                        </p>
                        <button onClick={() => handleDeleteTodo(todo._id)} type="button" id='close'>
                            {deleteLoading.includes(todo._id) ? (
                                <AiOutlineLoading3Quarters size={18} color="#F5F5F5" className="animate-spin" />
                            ) : (
                                <TfiClose size={16} />
                            )}
                        </button>
                    </div>
                ))
            )}
        </div>
    );

};

export default TodoItems;
