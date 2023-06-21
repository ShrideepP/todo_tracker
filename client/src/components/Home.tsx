import { AddTodo, TodoItems, FilterTodos } from ".";

const Home = () => {

    return (
        <section className="w-full min-h-[87.5vh] grid place-items-center">
            <div className="w-[90%] sm:w-3/4 md:w-2/4 lg:w-[500px] space-y-8">
                <h2 className="text-center text-2xl md:text-3xl text-dominant font-thin tracking-wider uppercase">
                    Ready to Conquer?
                </h2>
                <AddTodo />
                <TodoItems />
                <FilterTodos />
            </div>
        </section>
    );
};

export default Home;