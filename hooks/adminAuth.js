import { useSession, signIn as nextAuthSignIn, signOut as nextAuthSignOut } from "next-auth/react";

export const useAdminAuth = () => {
    const { data, status } = useSession();

    const adminSignIn = async (options = {}) => {
        // Default provider to credentials if not specified
        const provider = options.provider || "credentials";
        // Remove provider from options to avoid duplicate
        const { provider: _, ...restOptions } = options;

        // Add default callbackUrl if not provided
        if (!restOptions.callbackUrl) {
            restOptions.callbackUrl = "/admin/users";
        }

        return nextAuthSignIn(provider, restOptions);
    };

    const adminSignOut = async (options = {}) => {
        // Add default callbackUrl if not provided
        if (!options.callbackUrl) {
            options.callbackUrl = "/admin/login";
        }

        return nextAuthSignOut(options);
    };

    return {
        session: data,
        status,
        signIn: adminSignIn,
        signOut: adminSignOut,
        isAuthenticated: status === "authenticated",
        isAdmin: data?.user?.role === "admin",
    };
};