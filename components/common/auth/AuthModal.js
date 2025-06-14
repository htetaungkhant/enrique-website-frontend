import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from 'next/router';
import { IoMdCloseCircle } from "react-icons/io";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { cn, maskEmail } from "@/lib/utils";
import { useUserAuth } from "@/hooks/userAuth";
import ModalWrapper from "../ModalWrapper";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import Button from "../Button";
import Input from "../Input";

const resetPasswordSchema = z.object({
    password: z.string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
    otp: z.string().length(6, "OTP must be 6 digits")
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

const forgotPasswordSchema = z.object({
    email: z.string()
        .min(1, "Email is required")
        .email("Invalid email format"),
});

const AuthModal = ({
    className,
}) => {
    const { session, isAuthenticated } = useUserAuth();
    const [showLoginSuccessModal, setShowLoginSuccessModal] = useState(false);
    const router = useRouter();
    const { query: { auth, email } } = router;

    const resetPasswordForm = useForm({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
            otp: "",
        },
        mode: "onChange"
    });

    const forgotPasswordForm = useForm({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    });

    const toggleLoginSignup = () => {
        const query = { ...router.query, auth: auth === "login" ? "signup" : "login" };
        router.replace({
            pathname: router.pathname,
            query: query,
        });
    }

    const handleCloseIconBtn = () => {
        if (auth === "reset-password") {
            sessionStorage.removeItem("forgotPasswordEmail");
        }

        const query = { ...router.query };
        delete query.auth;
        delete query.email;
        router.replace({
            pathname: router.pathname,
            query: query,
        });
    }

    const handleBackToLogin = (e) => {
        e.preventDefault();

        if (auth === "reset-password") {
            sessionStorage.removeItem("forgotPasswordEmail");
        }

        const query = { ...router.query, auth: "login" };
        delete query.email;
        router.replace({
            pathname: router.pathname,
            query: query,
        });
    };

    const handleForgotPassword = async (data) => {
        try {
            const response = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to process request");
            }

            toast.success(result.message || "OTP sent successfully");

            sessionStorage.setItem("forgotPasswordEmail", data.email);
            const query = { ...router.query, auth: "reset-password", email: data.email };
            router.push({
                pathname: router.pathname,
                query: query,
            });
        } catch (error) {
            toast.error(error.message || "Failed to process request. Please try again later.");
        }
    };

    const onSubmitToResetPassword = async (data) => {
        try {
            const response = await fetch("/api/auth/update-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: sessionStorage.getItem("forgotPasswordEmail"),
                    password: data.password,
                    otp: data.otp,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                toast.error(result.message || "Failed to reset password");
                return;
            }

            toast.success(result.message || "Password reset successful");

            // reset all
            sessionStorage.removeItem("forgotPasswordEmail");
            resetPasswordForm.reset();
            resetPasswordForm.clearErrors();
            const query = { ...router.query, auth: "login" };
            delete query.email;
            delete query.auth;
            router.replace({
                pathname: router.pathname,
                query: query,
            });

        } catch (error) {
            toast.error(error.message || "An error occurred. Please try again.");
        }
    };

    useEffect(() => {
        if (session?.user?.role === "user" && !session?.validationFailed && isAuthenticated && (sessionStorage.getItem("justLoggedIn") === "1")) {
            setShowLoginSuccessModal(true);
            sessionStorage.removeItem("justLoggedIn");
        }

        return () => {
            sessionStorage.removeItem("justLoggedIn");
            sessionStorage.removeItem("forgotPasswordEmail");
        };
    }, [isAuthenticated]);

    return (
        <>
            <ModalWrapper
                backdrop={false}
                isOpen={!session && (auth === "login" || auth === "signup" || auth === "verification")}
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    className={
                        cn(
                            "mx-6 px-3 md:px-6 py-9 w-[75%] max-md:w-full max-xl:w-[85%] max-w-270 max-h-[95vh] md:max-h-[85vh] flex flex-col relative text-[#212A63] bg-white rounded-2xl shadow-xl inter-font",
                            className
                        )}
                >
                    {/* Close Button */}
                    <IoMdCloseCircle size={28} onClick={handleCloseIconBtn} className="absolute top-3 right-3 lg:left-3 text-[#484C52] hover:text-gray-500 cursor-pointer transition" />

                    <div className="min-h-28 min-w-28 flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        <div className="flex lg:gap-5 xl:gap-10">
                            {
                                auth === "login" ?
                                    <LoginForm toggleLoginSignup={toggleLoginSignup} />
                                    :
                                    <SignupForm toggleLoginSignup={toggleLoginSignup} />
                            }

                            <div className="max-lg:hidden flex-1 rounded-2xl overflow-hidden">
                                <Image
                                    src="/image/auth-image.png"
                                    width={445}
                                    height={743}
                                    alt="auth"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </ModalWrapper>

            <ModalWrapper
                backdrop={false}
                isOpen={showLoginSuccessModal}
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="mx-6 px-3 md:px-6 py-9 w-150 flex flex-col relative text-[#212A63] bg-white rounded-2xl shadow-xl inter-font"
                >
                    {/* Close Button */}
                    <IoMdCloseCircle size={28} onClick={() => setShowLoginSuccessModal(false)} className="absolute top-3 right-3 text-[#484C52] hover:text-gray-500 cursor-pointer transition" />

                    <div className="min-h-28 min-w-28 flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        <div className="p-3 flex flex-col gap-10 items-center justify-center inter-font">
                            <h4 className="font-medium text-center text-2xl">Congrats! You have successfully Logged In</h4>
                            <Button onClick={() => setShowLoginSuccessModal(false)} className="p-3 min-w-60">
                                Proceed
                            </Button>
                        </div>
                    </div>
                </div>
            </ModalWrapper>

            <ModalWrapper
                backdrop={false}
                isOpen={!session && (auth === "verify-success")}
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="mx-6 px-3 md:px-6 py-9 w-150 flex flex-col relative text-[#212A63] bg-white rounded-2xl shadow-xl inter-font"
                >
                    {/* Close Button */}
                    <IoMdCloseCircle size={28} onClick={handleCloseIconBtn} className="absolute top-3 right-3 text-[#484C52] hover:text-gray-500 cursor-pointer transition" />

                    <div className="min-h-28 min-w-28 flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        <div className="p-3 flex flex-col gap-10 items-center justify-center inter-font">
                            <h4 className="font-medium text-center text-2xl">Congrats! You have created your account</h4>
                            <Button onClick={handleBackToLogin} className="p-3 min-w-60">
                                Back to Login
                            </Button>
                        </div>
                    </div>
                </div>
            </ModalWrapper>

            <ModalWrapper
                backdrop={false}
                isOpen={!session && (auth === "forgot-password")}
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="mx-6 px-3 md:px-6 py-9 w-150 flex flex-col relative text-[#212A63] bg-white rounded-2xl shadow-xl inter-font"
                >
                    {/* Close Button */}
                    <IoMdCloseCircle size={28} onClick={handleCloseIconBtn} className="absolute top-3 right-3 text-[#484C52] hover:text-gray-500 cursor-pointer transition" />

                    <div className="min-h-28 min-w-28 flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        <Form {...forgotPasswordForm}>
                            <form onSubmit={forgotPasswordForm.handleSubmit(handleForgotPassword)} className="p-3 flex flex-col gap-5 justify-center inter-font">
                                <h4 className="font-medium text-2xl">Forgot Password?</h4>
                                <FormField
                                    control={forgotPasswordForm.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    label="Email"
                                                    placeholder="Email"
                                                    labelClassName="text-sm"
                                                    inputClassName="p-3"
                                                    error={forgotPasswordForm.formState.errors.email?.message}
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    type="submit"
                                    className="p-3 min-w-60"
                                    disabled={forgotPasswordForm.formState.isSubmitting}
                                >
                                    {forgotPasswordForm.formState.isSubmitting ? "Processing..." : "Continue"}
                                </Button>
                                <button
                                    onClick={(e) => { e.preventDefault(); router.back(); }}
                                    type="button"
                                    className="mx-auto text-[#212A63] font-bold hover:underline outline-none cursor-pointer"
                                >
                                    Back
                                </button>
                            </form>
                        </Form>
                    </div>
                </div>
            </ModalWrapper>

            <ModalWrapper
                backdrop={false}
                isOpen={!session && sessionStorage.getItem("forgotPasswordEmail") && (auth === "reset-password")}
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="mx-6 px-3 md:px-6 py-9 w-100 flex flex-col relative text-[#212A63] bg-white rounded-2xl shadow-xl inter-font"
                >
                    {/* Close Button */}
                    <IoMdCloseCircle size={28} onClick={handleCloseIconBtn} className="absolute top-3 right-3 text-[#484C52] hover:text-gray-500 cursor-pointer transition" />
                    <div className="min-h-28 min-w-28 flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        <h4 className="font-semibold text-2xl text-center">Reset Password</h4>
                        <Form {...resetPasswordForm}>
                            <form onSubmit={resetPasswordForm.handleSubmit(onSubmitToResetPassword)} className="mt-5 mx-auto w-full flex flex-col gap-3">
                                <FormField
                                    control={resetPasswordForm.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    label="Password"
                                                    placeholder="Enter your new password"
                                                    labelClassName="text-sm"
                                                    inputClassName="p-3"
                                                    error={resetPasswordForm.formState.errors.password?.message}
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={resetPasswordForm.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    label="Confirm Password"
                                                    placeholder="Confirm your new password"
                                                    labelClassName="text-sm"
                                                    inputClassName="p-3"
                                                    error={resetPasswordForm.formState.errors.confirmPassword?.message}
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={resetPasswordForm.control}
                                    name="otp"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <>
                                                    <label className="block text-[#403D4E] font-medium">OTP</label>
                                                    <InputOTP
                                                        maxLength={6}
                                                        containerClassName="justify-between"
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                    >
                                                        <InputOTPGroup>
                                                            <InputOTPSlot index={0} className="border p-5 rounded-none shadow-none" />
                                                        </InputOTPGroup>
                                                        <InputOTPGroup>
                                                            <InputOTPSlot index={1} className="p-5" />
                                                        </InputOTPGroup>
                                                        <InputOTPGroup>
                                                            <InputOTPSlot index={2} className="p-5" />
                                                        </InputOTPGroup>
                                                        <InputOTPGroup>
                                                            <InputOTPSlot index={3} className="p-5" />
                                                        </InputOTPGroup>
                                                        <InputOTPGroup>
                                                            <InputOTPSlot index={4} className="p-5" />
                                                        </InputOTPGroup>
                                                        <InputOTPGroup>
                                                            <InputOTPSlot index={5} className="p-5" />
                                                        </InputOTPGroup>
                                                    </InputOTP>
                                                    {resetPasswordForm.formState.errors.otp && (
                                                        <p className="text-xs text-red-500">{resetPasswordForm.formState.errors.otp.message}</p>
                                                    )}
                                                </>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <p className="text-center text-sm text-[#484C52]">
                                    Enter the 6-digit OTP sent to your <span style={{ fontFamily: "monospace" }}>{maskEmail(email) || "email"}</span>
                                </p>
                                <Button
                                    type="submit"
                                    className="mx-auto mt-5 min-w-60 py-4"
                                    disabled={
                                        resetPasswordForm.formState.isSubmitting ||
                                        !resetPasswordForm.formState.isValid ||
                                        !resetPasswordForm.formState.values.password ||
                                        !resetPasswordForm.formState.values.confirmPassword ||
                                        !resetPasswordForm.formState.values.otp ||
                                        resetPasswordForm.formState.values.otp.length !== 6
                                    }
                                >
                                    {resetPasswordForm.formState.isSubmitting ? "Submitting..." : "Submit"}
                                </Button>
                            </form>
                        </Form>
                    </div>
                </div>
            </ModalWrapper>
        </>
    )
}

export default AuthModal;