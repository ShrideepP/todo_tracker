import { BsCheck } from 'react-icons/bs';

const Todo = () => {
    return (
        <div className="flex items-center gap-x-3">
            <button type="button" style={{ border: '1px solid transparent', background: 'linear-gradient(#0A0A0A, #0A0A0A) padding-box, linear-gradient(45deg, rgba(168,85,247,1) 0%, rgba(244,63,94,1) 100%) border-box' }} className="w-5 h-5 grid place-items-center rounded-full">
                <BsCheck size={16} color="#F5F5F5" />
            </button>
            <p className={`text-sm text-compliment font-medium tracking-wide`}>Complete Home Work</p>
        </div>
    );
};

export default Todo;
