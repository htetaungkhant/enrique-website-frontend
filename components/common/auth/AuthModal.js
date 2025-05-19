import Image from "next/image";
import { useRouter } from 'next/router';
import { useSession } from "next-auth/react";
import { IoMdCloseCircle } from "react-icons/io";

import { cn } from "@/lib/utils";
import ModalWrapper from "../ModalWrapper";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const AuthModal = ({
    className,
}) => {
    const { data: session } = useSession();
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
        </>
    )
}

export default AuthModal;