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
            <form noValidate onSubmit={handleSubmit(submitData)} className="w-[90%] sm:w-3/4 md:w-2/4 lg:w-[500px] space-y-8">
                <h2 className="text-center text-2xl md:text-3xl text-dominant font-thin tracking-wider uppercase">
                    Sign Up
                </h2>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <input type="text" placeholder="Name" {...register("name")} className="w-full h-12 px-5 text-sm text-dominant placeholder:text-compliment tracking-wider font-semibold outline-none border border-compliment bg-transparent rounded-full" />
                        {errors.name && (
                            <p className="pl-5 text-sm text-red-500 font-medium">{errors.name?.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <input type="email" placeholder="Email" {...register("email")} className="w-full h-12 px-5 text-sm text-dominant placeholder:text-compliment tracking-wider font-semibold outline-none border border-compliment bg-transparent rounded-full" />
                        {errors.email && (
                            <p className="pl-5 text-sm text-red-500 font-medium">{errors.email?.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <input type="password" placeholder="Password" {...register("password")} className="w-full h-12 px-5 text-sm text-dominant placeholder:text-compliment tracking-wider font-semibold outline-none border border-compliment bg-transparent rounded-full" />
                        {errors.password && (
                            <p className="pl-5 text-sm text-red-500 font-medium">{errors.password?.message}</p>
                        )}
                    </div>
                    <div>
                        <button type="submit" className="w-full h-12 grid place-items-center bg-gradient-to-tr from-primary to-secondary rounded-full">
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
                <p className="text-center text-sm text-compliment font-medium tracking-wide">
                    Already have an account? <Link to="/sign-in" className="text-dominant font-semibold hover:underline">Sign In</Link>
                </p>
            </form>
        </section>
    );

};

export default SignUp;