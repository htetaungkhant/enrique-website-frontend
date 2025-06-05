import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from 'next/router';
import { IoMdCloseCircle } from "react-icons/io";
import { ArrowLeft, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { useUserAuth } from "@/hooks/userAuth";
import ModalWrapper from "../ModalWrapper";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import Button from "../Button";
import Input from "../Input";

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
        if (auth === "forgot-password-email-sent") {
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

        if (auth === "forgot-password-email-sent") {
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

            toast.success(result.message || "Password reset instructions have been sent to your email");

            sessionStorage.setItem("forgotPasswordEmail", data.email);
            const query = { ...router.query, auth: "forgot-password-email-sent", email: data.email };
            router.push({
                pathname: router.pathname,
                query: query,
            });
        } catch (error) {
            toast.error(error.message || "Failed to process request. Please try again later.");
        }
    };

    useEffect(() => {
        if (!session?.validationFailed && isAuthenticated && (sessionStorage.getItem("justLoggedIn") === "1")) {
            setShowLoginSuccessModal(true);
            sessionStorage.removeItem("justLoggedIn");
        }
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
                isOpen={!session && sessionStorage.getItem("forgotPasswordEmail") && (auth === "forgot-password-email-sent")}
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="mx-6 px-3 md:px-6 py-9 w-150 flex flex-col relative text-[#212A63] bg-white rounded-2xl shadow-xl inter-font"
                >
                    {/* Close Button */}
                    <IoMdCloseCircle size={28} onClick={handleCloseIconBtn} className="absolute top-3 right-3 text-[#484C52] hover:text-gray-500 cursor-pointer transition" />
                    <div className="min-h-28 min-w-28 flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        <div className="p-3 flex flex-col gap-5 items-center justify-center inter-font">
                            <span className="bg-gray-400 p-2 rounded-full">
                                <Mail className="text-white w-10 h-10 p-2 bg-[#212A63] rounded-full" />
                            </span>
                            <h4 className="font-bold text-black text-center text-2xl">Check your email</h4>
                            <p className="text-center text-[#828282]">We sent a password reset link to<br />{sessionStorage.getItem("forgotPasswordEmail")}</p>
                            <button
                                type="button"
                                onClick={handleBackToLogin}
                                className="flex gap-2 text-[#212A63] hover:underline outline-none cursor-pointer"
                            >
                                <ArrowLeft />
                                Back to Login
                            </button>
                        </div>
                    </div>
                </div>
            </ModalWrapper>
        </>
    )
}

export default AuthModal;