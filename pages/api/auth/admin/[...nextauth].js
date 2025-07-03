import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { validateAdminCredentials, refreshToken } from "@/lib/inhouseAPI/auth-route";

const maxAge = 30 * 24 * 60 * 60; // 30 days
const updateAge = 24 * 60 * 60; // 24 hours

export const adminAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Admin Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const admin = await validateAdminCredentials(credentials.email, credentials.password);

                if (admin && admin.isAdmin) {
                    return {
                        id: admin.id,
                        email: admin.email,
                        role: "admin",
                        ...admin
                    };
                }

                return null;
            }
        }),
    ],
    session: {
        strategy: 'jwt',
        maxAge,
        updateAge,
    },
    jwt: {
        maxAge,
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                // token = { ...token, ...user };
                // token.role = user.role;
                // token.adminId = user.id;

                token.expiresAt = Date.now() + maxAge * 1000;
                Object.keys(user).forEach(key => {
                    token[key] = user[key];
                });
            }

            if (Date.now() >= token.expiresAt) {
                const refreshed = await refreshToken(token.token, token.id);
                if (refreshed?.token) {
                    token.token = refreshed.token;
                    token.expiresAt = Date.now() + maxAge * 1000;
                }
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                // session.user = { ...session.user, ...token };
                // session.user.role = token.role;
                // session.user.id = token.adminId;

                Object.keys(token).forEach(key => {
                    if (key !== "token") session.user[key] = token[key];
                });
            }
            return session;
        },
    },
    pages: {
        signIn: '/admin/login',
        error: '/admin/login',
    },
    // Different cookie name for admin authentication
    cookies: {
        sessionToken: {
            name: `next-auth.session-token.admin`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: process.env.NODE_ENV === "production",
            },
        },
    },
}

export default NextAuth(adminAuthOptions);