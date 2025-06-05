import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from 'next/router';
import { IoMdCloseCircle } from "react-icons/io";

import { cn } from "@/lib/utils";
import { useUserAuth } from "@/hooks/userAuth";
import ModalWrapper from "../ModalWrapper";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import Button from "../Button";

const AuthModal = ({
    className,
}) => {
    const { session, isAuthenticated } = useUserAuth();
    const [showLoginSuccessModal, setShowLoginSuccessModal] = useState(false);
    const router = useRouter();
    const { query: { auth } } = router;

    const toggleLoginSignup = () => {
        const query = { ...router.query, auth: auth === "login" ? "signup" : "login" };
        router.replace({
            pathname: router.pathname,
            query: query,
        });
    }

    const handleCloseIconBtn = () => {
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
        const query = { ...router.query, auth: "login" };
        delete query.email;
        router.replace({
            pathname: router.pathname,
            query: query,
        });
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
        </>
    )
}

export default AuthModal;