import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { z, ZodType } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from "react-query";
import { useCookies } from "react-cookie";
import { toast } from "react-hot-toast";
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { BASE_URL } from "../constants";
import axios from "axios";

interface FormSchema {
    email: string
    password: string
};

const schema: ZodType<FormSchema> = z.object({
    email: z.string()
        .nonempty('Email is required'),
    password: z.string()
        .nonempty('Password is required'),
});

const SignIn = () => {

    const navigate = useNavigate();

    const Auth = useContext(AuthContext);

    const [_, setCookies] = useCookies(["access_token"]);

    const signInMutation = useMutation((data: FormSchema) => {
        return axios.post(`${BASE_URL}/api/auth/sign-in`, data);
    });

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormSchema>({ resolver: zodResolver(schema) });

    const submitData = async (formdata: FormSchema) => {
        try {
            const { data } = await signInMutation.mutateAsync(formdata);
            setCookies('access_token', data.token);
            localStorage.setItem('Id', data.user._id);
            localStorage.setItem('name', data.user.name);
            localStorage.setItem('email', data.user.email);
            Auth?.setId(data.user._id);
            Auth?.setCredentials({
                name: data.user.name,
                email: data.user.email,
            });
            toast.success('Signed in successfully.');
            navigate('/');
            reset();
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                toast.error('Invalid credentials.');
            };
        };
    };

    return (
        <section className="w-full min-h-[87.5vh] grid place-items-center">
            <form noValidate onSubmit={handleSubmit(submitData)} className="w-4/5 sm:w-3/5 md:w-2/5 lg:w-[30%] space-y-10">
                <h2 className="text-center text-4xl text-dominant font-light tracking-widest uppercase">
                    Sign In
                </h2>
                <div className="space-y-4">
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
                            {signInMutation.isLoading ? (
                                <AiOutlineLoading3Quarters color="#F5F5F5" size={20} className="animate-spin" />
                            ) : (
                                <span className="text-xs text-dominant font-bold tracking-widest uppercase">
                                    Sign In
                                </span>
                            )}
                        </button>
                    </div>
                </div>
                <p className="text-center text-sm text-compliment font-semibold">
                    Don't have an account? <Link to="/sign-up" className="text-dominant font-bold hover:underline">Sign Up</Link>
                </p>
            </form>
        </section>
    );
};

export default SignIn;