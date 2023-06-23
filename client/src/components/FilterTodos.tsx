interface FilterTodosProps {
    handleFilterChange: (filter: string) => void;
};

const FilterTodos = ({ handleFilterChange } : FilterTodosProps) => {
    return (
        <button onClick={() => handleFilterChange('all')}>FilterTodos</button>
    );
};

export default FilterTodos;
