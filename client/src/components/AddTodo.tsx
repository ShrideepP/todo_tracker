import { ZodType, z } from 'zod';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useCookies } from 'react-cookie';
import { zodResolver } from '@hookform/resolvers/zod';
import { AiOutlinePlus, AiOutlineLoading3Quarters } from 'react-icons/ai';
import { toast } from 'react-hot-toast';
import { BASE_URL } from '../constants';
import axios from 'axios';

interface TodoSchema {
    title: string;
};

const schema: ZodType<TodoSchema> = z.object({
    title: z.string()
});

const AddTodo = () => {

    const { register, handleSubmit, reset } = useForm<TodoSchema>({ resolver: zodResolver(schema) });

    const userId = localStorage.getItem('Id');

    const [cookies, _] = useCookies(["access_token"]);

    const addTodo = async (data: TodoSchema) => {
        const response = await axios.post(`${BASE_URL}/api/todo/create/${userId}`, data, {
            headers: { 'Authorization': `Bearer ${cookies.access_token}` }
        });
        return response.data;
    };
 
    const { mutateAsync, isLoading } = useMutation(addTodo);

    const submitData = async (data: TodoSchema) => {
        if(!data.title) {
            toast.error('Todo cannot be empty!');
            return;
        };

        try {
            await mutateAsync(data);
            toast.success('Todo created successfully');
            reset()
        } catch (error) {  
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                toast.error('User not found.');
            } else if (axios.isAxiosError(error) && error.response?.status === 500) {
                toast.error('Internal server error.');
            };
            reset();
        };
    };

    return (
        <form onSubmit={handleSubmit(submitData)} className="w-full h-fit">
            <div style={{background: 'rgba(255,255,255,.06)'}} className="w-full h-12 px-2 flex items-center gap-x-4 rounded-full">
                <button type="submit" className="w-8 h-8 grid place-items-center bg-gradient-to-tr from-primary to-secondary rounded-full">
                    {isLoading ? (
                        <AiOutlineLoading3Quarters size={16} color="#F5F5F5" className="animate-spin" />
                    ) : (
                        <AiOutlinePlus size={16} color="#F5F5F5" />
                    )}
                </button>
                <input type="text" {...register("title")} placeholder="What's your next goal?" className='flex-1 h-full text-sm text-dominant placeholder:text-compliment font-semibold tracking-wide outline-none border-none bg-transparent' />
            </div>
        </form>
    );

};

export default AddTodo;