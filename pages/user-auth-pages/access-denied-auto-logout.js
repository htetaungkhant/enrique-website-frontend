import { useEffect, useState } from "react";

import { useUserAuth } from "@/hooks/userAuth";
import { useRouter } from "next/router";


const AccessDeniedAutoLogout = () => {
    const router = useRouter();
    const { signOut } = useUserAuth();
    const [redirectCountdown, setRedirectCountdown] = useState(5);

    const logoutAndRedirect = () => {
        const { callbackUrl } = router.query;

        signOut({
            callbackUrl: callbackUrl || "/",
        });
    }

    useEffect(() => {
        const countdown = setInterval(() => {
            setRedirectCountdown((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(countdown);
    }, []);

    useEffect(() => {
        if (redirectCountdown === 0) {
            const { callbackUrl } = router.query;

            signOut({
                callbackUrl: callbackUrl || "/",
            });
        }
    }, [redirectCountdown, signOut]);

    return (
        <main className="w-screen h-screen flex flex-col justify-center items-center bg-white font-bold">
            <h1 className="text-4xl">Access Denied</h1>
            <p className="text-lg mt-4 font-medium">You will be redirected in {redirectCountdown} seconds.</p>
            <button onClick={logoutAndRedirect} className="mt-4 text-blue-500 underline font-medium">
                go back now
            </button>
        </main>
    )
}

export default AccessDeniedAutoLogout;