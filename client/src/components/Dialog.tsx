import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { useCookies } from "react-cookie";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { BASE_URL } from "../constants";
import axios from "axios";

interface DialogProps {
    isOpen: boolean;
    toggleIsOpen: () => void;
};

const Dialog = ({ isOpen, toggleIsOpen } : DialogProps) => {

    const navigate = useNavigate();

    const [cookies, setCookies] = useCookies(["access_token"]);

    const Id = localStorage.getItem('Id');

    const deleteAccount = async (userId: string) => {
        const response = await axios.delete(`${BASE_URL}/api/user/delete/${userId}`, {
            headers: { 'Authorization' : `Bearer ${cookies.access_token}` },
        });
        return response.data;
    };

    const { mutateAsync, isLoading } = useMutation(deleteAccount);

    const handleDeleteAccount = async () => {
        try {  
            if(Id) {
                await mutateAsync(Id);
            } else {
                toast.error('User id not found');
            };
            navigate('/sign-in');
            localStorage.clear();
            setCookies("access_token", "");
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                toast.error('Invalid or expired token.');
            } else if (axios.isAxiosError(error) && error.response?.status === 500) {
                toast.error('Internal server error.');
            };
        };
    };

    return (
        isOpen && (
            <motion.div 
                onClick={toggleIsOpen} 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ background: 'rgba(0,0,0,.8)', backdropFilter: 'blur(2px)' }} 
                className="w-full h-screen fixed top-0 left-0 z-50 flex justify-center items-end sm:items-center"
            >
                <motion.div 
                    onClick={(event) => event.stopPropagation()} 
                    initial={{ y: '-100vh', opacity: 0 }}
                    animate={{ y: '0vh', opacity: 1 }}
                    transition={{ duration: 0.1, type: 'spring', damping: 100, stiffness: 500 }}
                    exit={{ y: '100vh', opacity: 0 }}
                    style={{ border: '1px solid rgba(255,255,255,.2)' }} 
                    className="w-full sm:w-3/4 md:w-2/4 lg:w-[500px] p-4 md:p-6 space-y-6 bg-background rounded-t-lg sm:rounded-lg"
                >
                    <div className="space-y-2">
                        <h4 className="text-xl text-dominant font-semibold">
                            Are you absolutely sure?
                        </h4>
                        <p className="text-sm text-compliment font-medium tracking-wide">
                            This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                        </p>
                    </div>
                    <div className="flex flex-col-reverse sm:flex-row justify-end gap-2">
                        <button onClick={toggleIsOpen} type="button" style={{border: '1px solid rgba(255,255,255,.2)'}} className="w-full sm:w-24 h-[2.4rem] rounded">
                            <span className="text-sm text-dominant font-semibold tracking-wider">
                                Cancel
                            </span>
                        </button>
                        <button onClick={handleDeleteAccount} type="button" style={{border: '1px solid #F5F5F5'}} className="w-full sm:w-24 h-[2.4rem] grid place-items-center bg-dominant rounded">
                            {isLoading ? (
                                <AiOutlineLoading3Quarters size={20} color="#0A0A0A" className="animate-spin" />
                            ) : (
                                <span className="text-sm text-background font-bold tracking-wider">
                                    Continue
                                </span>
                            )}
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        )
    );

};

export default Dialog;