import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from '@hookform/resolvers/zod';
import { z, ZodType } from 'zod';
import { useMutation, } from 'react-query';
import { useCookies } from "react-cookie";
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

const UpdateProfile = () => {

    const navigate = useNavigate();

    const [cookies, _] = useCookies(["access_token"]);

    const Auth = useContext(AuthContext);

    const Id = localStorage.getItem('Id');
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');

    const updateProfileMutation = useMutation((data: FormSchema) => {
        return axios.put(`${BASE_URL}/api/user/edit/${Id ? Id : Auth?.Id}`, data, {
            headers: {
                'Authorization': `Bearer ${cookies.access_token}`,
            },
        });
    });

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormSchema>({ resolver: zodResolver(schema) });

    const submitData = async (formdata: FormSchema) => {
        try {
            await updateProfileMutation.mutateAsync(formdata);
            toast.success('Profile updated successfully.');
            localStorage.setItem('name', formdata.name);
            localStorage.setItem('email', formdata.email);
            Auth?.setCredentials({
                name: formdata.name,
                email: formdata.email,
            });
            navigate('/profile');
            reset();
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                toast.error('User not found!');
            } else if (axios.isAxiosError(error) && error.response?.status === 401) {
                toast.error('Invalid or expired token');
            };
        };
    };

    return (
        <section className="w-full min-h-[87.5vh] grid place-items-center">
            <form noValidate onSubmit={handleSubmit(submitData)} className="w-[90%] sm:w-3/4 md:w-2/4 lg:w-[500px] space-y-10">
                <h2 className="text-center text-4xl text-dominant font-light tracking-wider uppercase">
                    Sign Up
                </h2>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <input type="text" placeholder="Name" {...register("name")} defaultValue={name ? name : Auth?.credentials.name} className="w-full h-12 px-5 text-sm text-dominant placeholder:text-compliment tracking-wider font-semibold outline-none border border-compliment bg-transparent rounded-full" />
                        {errors.name && (
                            <p className="text-sm text-red-500 font-medium">{errors.name?.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <input type="email" placeholder="Email" {...register("email")} defaultValue={email ? email : Auth?.credentials.email} className="w-full h-12 px-5 text-sm text-dominant placeholder:text-compliment tracking-wider font-semibold outline-none border border-compliment bg-transparent rounded-full" />
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
                            {updateProfileMutation.isLoading ? (
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
                    Discard Changes? <Link onClick={() => reset()} to="/profile" className="text-dominant font-bold hover:underline">Click here</Link>
                </p>
            </form>
        </section>
    );

};

export default UpdateProfile;