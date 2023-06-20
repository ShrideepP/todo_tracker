import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from '@hookform/resolvers/zod';
import { z, ZodType } from 'zod';
import { useMutation, } from 'react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { BASE_URL } from "../constants";
import axios from 'axios';

interface FormSchema {
    name: string
    email: string
    password: string
};

const schema: ZodType<FormSchema> = z.object({
    name: z.string().nonempty('Name is required'),
    email: z.string()
        .nonempty('Email is required')
        .email('Invalid email address'),
    password: z.string()
        .nonempty('Password is required')
        .min(6, 'Password must be of minimum 6 characters')
        .max(10, 'Password must be of maximum 10 characters')
});

const SignUp = () => {

    const navigate = useNavigate();

    const signUpMutation = useMutation((data: FormSchema) => {
        return axios.post(`${BASE_URL}/api/auth/sign-up`, data);
    });

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormSchema>({ resolver: zodResolver(schema) });

    const submitData = async (formdata: FormSchema) => {
        try {
            await signUpMutation.mutateAsync(formdata);
            toast.success('Sign in to continue');
            navigate('/sign-in');
            reset();
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 409) {
                toast.error('Account already exists!');
            } else if (axios.isAxiosError(error) && error.response?.status === 500) {
                toast.error('Internal server error.');
            };
            reset();
        };
    };

    return (
        <section className="w-full min-h-[87.5vh] grid place-items-center">
            <form noValidate onSubmit={handleSubmit(submitData)} className="w-4/5 sm:w-3/5 md:w-2/5 lg:w-[30%] space-y-10">
                <h2 className="text-center text-4xl text-dominant font-light tracking-widest uppercase">
                    Sign Up
                </h2>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <input type="text" placeholder="Name" {...register("name")} className="w-full h-12 px-5 text-sm text-dominant placeholder:text-compliment tracking-wider font-semibold outline-none border border-compliment bg-transparent rounded-full" />
                        {errors.name && (
                            <p className="text-sm text-red-500 font-medium">{errors.name?.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <input type="email" placeholder="Email" {...register("email")} className="w-full h-12 px-5 text-sm text-dominant placeholder:text-compliment tracking-wider font-semibold outline-none border border-compliment bg-transparent rounded-full" />
                        {errors.email && (
                            <p className="text-sm text-red-500 font-medium">{errors.email?.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <input type="password" placeholder="Password" {...register("password")} className="w-full h-12 px-5 text-sm text-dominant placeholder:text-compliment tracking-wider font-semibold outline-none border border-compliment bg-transparent rounded-full" />
                        {errors.password && (
                            <p className="text-sm text-red-500 font-medium">{errors.password?.message}</p>
                        )}
                    </div>
                    <div>
                        <button type="submit" style={{background: 'linear-gradient(45deg, rgba(168,85,247,1) 0%, rgba(244,63,94,1) 100%)'}} className="w-full h-12 grid place-items-center rounded-full">
                            {signUpMutation.isLoading ? (
                                <AiOutlineLoading3Quarters color="#F5F5F5" size={20} className="animate-spin" />
                            ) : (
                                <span className="text-xs text-dominant font-bold tracking-widest uppercase">
                                    Sign Up
                                </span>
                            )}
                        </button>
                    </div>
                </div>
                <p className="text-center text-sm text-compliment font-semibold">
                    Already have an account? <Link to="/sign-in" className="text-dominant font-bold hover:underline">Sign In</Link>
                </p>
            </form>
        </section>
    );

};

export default SignUp;