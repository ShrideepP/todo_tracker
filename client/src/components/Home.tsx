import { useState } from "react";
import { useCookies } from "react-cookie";
import { useQuery } from "react-query";
import { AddTodo, TodoItems, FilterTodos } from ".";
import axios from "axios";
import { BASE_URL } from "../constants";

const Home = () => {

    const [filter, setFilter] = useState('all');

    const [cookies, _] = useCookies(["access_token"]);

    const userId = localStorage.getItem('Id');

    const fetchTodos = async () => {
        const response = await axios.get(`${BASE_URL}/api/todo/${filter}/${userId}`, {
            headers: { 'Authorization': `Bearer ${cookies.access_token}` },
        });
        return response.data;
    };

    const { data, isLoading } = useQuery(['todos', filter], fetchTodos, {
        refetchOnWindowFocus: false,
    });

    const handleFilterChange = (filter: string) => setFilter(filter);

    return (
        <section className="w-full min-h-[87.5vh] flex justify-center pt-40 pb-10">
            <div className="w-[90%] sm:w-3/4 md:w-2/4 lg:w-[500px] space-y-8">
                <h2 className="text-center text-2xl md:text-3xl text-dominant font-thin tracking-wider uppercase">
                    Ready to Conquer?
                </h2>
                <AddTodo />
                <TodoItems data={data} isLoading={isLoading} />
                <FilterTodos handleFilterChange={handleFilterChange} />
            </div>
        </section>
    );
};

export default Home;