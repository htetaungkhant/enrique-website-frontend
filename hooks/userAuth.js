import { useSession, signIn as nextAuthSignIn, signOut as nextAuthSignOut } from "next-auth/react";

export const useUserAuth = () => {
    const { data, status, update } = useSession();

    const userSignIn = async (options = {}) => {
        // Default provider to credentials if not specified
        const provider = options.provider || "credentials";
        // Remove provider from options to avoid duplicate
        const { provider: _, ...restOptions } = options;

        if (typeof restOptions.callbackUrl === "string") {
            if (restOptions.callbackUrl.startsWith("/profile")) {
                const url = new URL(restOptions.callbackUrl, window.location.origin);
                url.searchParams.set("comeFrom", window.location.href);
                restOptions.callbackUrl = url.toString();
            }
            else {
                const url = new URL(restOptions.callbackUrl, window.location.origin);
                restOptions.callbackUrl = url.toString();
            }
        }
        else {
            // restOptions.callbackUrl = `/profile/personal-details`;


            // restOptions.callbackUrl = `/profile/personal-details?comeFrom=${window.location.href}`;
            const url = new URL("/profile/personal-details", window.location.origin);
            url.searchParams.set("comeFrom", window.location.href);
            restOptions.callbackUrl = url.toString();
        }

        return nextAuthSignIn(provider, restOptions);
    };

    const userSignOut = async (options = {}) => {
        // Add default callbackUrl if not provided
        if (!options.callbackUrl) {
            options.callbackUrl = "/";
        }

        return nextAuthSignOut(options);
    };

    return {
        session: data,
        status,
        updateUserSession: update,
        signIn: userSignIn,
        signOut: userSignOut,
        isAuthenticated: status === "authenticated",
        isUser: data?.user?.role === "user",
    };
};