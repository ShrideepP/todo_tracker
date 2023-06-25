import { useCookies } from "react-cookie";
import { useMutation, useQueryClient } from "react-query";
import { BASE_URL } from "../constants";
import { toast } from "react-hot-toast";
import axios from "axios";

interface FilterTodosProps {
    filter: string;
    handleFilterChange: (filter: string) => void;
    todoCount: number | null
};

const FilterTodos = ({ filter, handleFilterChange, todoCount } : FilterTodosProps) => {

    const userID = localStorage.getItem('Id');

    const [cookies, _] = useCookies(['access_token']);

    const queryClient = useQueryClient();

    const clearCompleted = async () => {
        return axios.delete(`${BASE_URL}/api/todo/delete/completed/${userID}`, {
            headers: { 'Authorization': `Bearer ${cookies.access_token}` }
        });
    };

    const { mutateAsync } = useMutation(clearCompleted, {
        onSuccess: () => {
            queryClient.invalidateQueries('todos');
        },
    });

    const handleClearCompleted = async () => {
        try {
            await mutateAsync();
            toast.success('Removed completed todos!');
        } catch (error) {
            toast.error('Oops! something went wrong.');
        };
    };

    return (
        <div style={{background: 'rgba(255,255,255,.06)'}} className="w-full min-h-[3rem] py-2 px-4 md:px-6 flex flex-wrap justify-center md:justify-between items-center gap-4 rounded-full">
            <p className="text-xs text-compliment hover:text-dominant font-semibold tracking-wide">
                {todoCount} items left
            </p>
            <div className="flex items-center gap-x-4">
                <button onClick={() => handleFilterChange('all')} type="button" className={`text-xs text-compliment hover:text-dominant ${filter === 'all' && 'text-primary'} font-semibold tracking-wide`}>
                    All
                </button>
                <button onClick={() => handleFilterChange('active')} type="button" className={`text-xs text-compliment hover:text-dominant ${filter === 'active' && 'text-primary'} font-semibold tracking-wide`}>
                    Active
                </button>
                <button onClick={() => handleFilterChange('completed')} type="button" className={`text-xs text-compliment hover:text-dominant ${filter === 'completed' && 'text-primary'} font-semibold tracking-wide`}>
                    Completed
                </button>
            </div>
            <button onClick={handleClearCompleted} type="button" className="text-xs text-compliment hover:text-dominant font-semibold tracking-wide">
                Clear Completed
            </button>
        </div>
    );

};

export default FilterTodos;
