
import Image from "next/image";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from 'react-toastify';

import { useUserAuth } from "@/hooks/userAuth";
import Input, { PasswordInput } from "../Input";
import Button from "../Button";



const schema = z.object({
    email: z.string({ required_error: "Email is required" })
        .nonempty({ message: "Email is required" })
        .email({ message: "Invalid email address" }),
    password: z.string({ required_error: "Password is required" })
        .nonempty({ message: "Password is required" })
        .min(8, { message: "Password must be at least 8 characters" }),
});

const LoginForm = ({ toggleLoginSignup }) => {
    const router = useRouter();
    const { signIn } = useUserAuth();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            const result = await signIn({
                provider: "credentials",
                email: data.email,
                password: data.password,
                redirect: false,
            });

            if (result?.status === 200) {
                sessionStorage.setItem("justLoggedIn", "1");

                const path = window.location.pathname;
                const searchParams = new URLSearchParams(window.location.search);
                searchParams.delete("auth");
                const callbackUrl = searchParams.size > 0 ? `${path}?${searchParams.toString()}` : path;
                router.replace(callbackUrl);
            } else {
                toast.error("Invalid email or password");
                setError("email", { message: " " });
                setError("password", { message: " " });
            }
        } catch (error) {
            console.error("signin error", error);
            toast.error("An unexpected error occurred");
        }
    };

    const handleGoogleLogin = async (e) => {
        e.preventDefault();
        try {
            sessionStorage.setItem("justLoggedIn", "1");

            const path = window.location.pathname;
            const searchParams = new URLSearchParams(window.location.search);
            searchParams.delete("auth");
            const callbackUrl = searchParams.size > 0 ? `${path}?${searchParams.toString()}` : path;
            const options = {
                provider: 'google',
                redirect: false,
                callbackUrl,
            };
            await signIn(options);
        } catch (error) {
            console.error("signin error", error);
            toast.error("An unexpected error occurred");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="px-3 flex-1 flex flex-col gap-3 justify-center max-lg:text-xs text-sm text-[#848484]">
            <h1 className="text-center text-3xl font-bold text-[#484C52]">Login</h1>
            <p className="text-center">Login to continue to our website</p>
            <div className="mt-4 xl:mt-8 mx-auto w-full lg:max-w-85 flex flex-col gap-5">
                <div>
                    <Input
                        type="email"
                        placeholder="Enter Email"
                        inputClassName={`py-3 px-4 border-[#E6E6E6] text-[#2D3748] placeholder:text-[#848484] ${errors.email ? 'border-red-500' : ''}`}
                        autoComplete="username"
                        {...register("email")}
                    />
                    {errors.email && (
                        <span className="text-xs text-red-500 mt-1 block">{errors.email.message}</span>
                    )}
                </div>
                <div>
                    <PasswordInput
                        placeholder="Password"
                        inputClassName={`py-3 px-4 border-[#E6E6E6] text-[#2D3748] placeholder:text-[#848484] ${errors.password ? 'border-red-500' : ''}`}
                        autoComplete="current-password"
                        {...register("password")}
                    />
                    {errors.password && (
                        <span className="text-xs text-red-500 mt-1 block">{errors.password.message}</span>
                    )}
                </div>
                <span className="ml-auto text-[#313C66] hover:underline cursor-pointer">Forgot Password?</span>
                <Button type="submit" title={isSubmitting ? "Logging in..." : "Login"} disabled={isSubmitting}>
                    {isSubmitting ? "Logging in..." : "Login"}
                </Button>
                <p className="text-center text-[#2D3748]">Don’t have an account? <span className="font-bold text-[#212A63] cursor-pointer" onClick={toggleLoginSignup}>Sign up</span></p>
                <Image
                    width={40}
                    height={40}
                    src="/icon/google.png"
                    alt="google"
                    onClick={handleGoogleLogin}
                    className="mx-auto w-10 h-10 max-lg:w-8 max-lg:h-8 cursor-pointer"
                />
            </div>
        </form>
    );
};

export default LoginForm;