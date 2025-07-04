import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import { validateGoogleIdToken, validateUserCredentials, refreshToken } from "@/lib/inhouseAPI/auth-route";

const maxAge = 30; // 30 days
const updateAge = 24; // 24 hours

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const user = await validateUserCredentials(credentials.email, credentials.password);

                if (user && !user.isAdmin) {
                    return {
                        id: user.id,
                        email: user.email,
                        role: "user",
                        ...user
                    };
                }

                return null
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
    ],
    pages: {
        signIn: "/user-auth-pages",
        error: '/user-auth-pages',
    },
    session: {
        strategy: 'jwt',
        maxAge,
        updateAge,
    },
    jwt: {
        maxAge,
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            // console.log("callbacks signIn", user, account, profile, email, credentials);
            if (account?.provider === "google" && account.id_token) {
                try {
                    const validatedUser = await validateGoogleIdToken(account.id_token);
                    if (validatedUser) {
                        user.backendData = validatedUser;
                        return true;
                    }
                    else {
                        account.validationFailed = true;
                        return true;
                    }
                } catch (error) {
                    console.error('Google token validation failed:', error);
                    account.validationFailed = true;
                    return true;
                }
            }
            return true;
        },
        async jwt({ token, user, account, profile, isNewUser, trigger, session }) {
            // Handle initial sign in
            if (user) {
                if (account?.provider === "google") {
                    if (account.validationFailed) {
                        // Mark token as invalid but don't fail the JWT creation
                        token.validationFailed = true;
                        token.role = null;
                    } else if (user.backendData) {
                        token.role = user.backendData.role || "user";
                        token.userId = user.backendData.id;
                        token.backendData = user.backendData;
                    }
                } else {
                    // For credentials users
                    token.role = user.role || "user";
                    token.userId = user.id;
                    token.backendData = { ...user }
                }
            }

            // Handle updates
            if (trigger === "update" && session?.user) {
                token.backendData = session.user.backendData;
            }

            if (Date.now() >= token.expiresAt) {
                const refreshed = await refreshToken(token.token, token.id || token.userId || token.backendData.id);
                if (refreshed?.token) {
                    token.token = refreshed.token;
                    token.expiresAt = Date.now() + maxAge * 1000;
                }
            }

            return token;
        },
        async session({ session, user, token }) {
            // console.log("callbacks session", session, user, token);
            if (session.user) {
                if (token.validationFailed) {
                    // Return a session that indicates validation failure
                    session.validationFailed = true;
                    session.user.role = null;
                } else {
                    session.user.role = token.role;
                    session.user.id = token.userId;

                    if (token.backendData) {
                        // session.user.backendData = token.backendData;

                        session.user.backendData = {};
                        Object.entries(token.backendData).forEach(([key, value]) => {
                            if (key !== "token") {
                                session.user.backendData[key] = value;
                            }
                        });
                    }
                }
            }
            return session;
        },
        // async redirect({ url, baseUrl }) {
        //     console.log("==========================================================================> callbacks redirect", url, baseUrl); // http://localhost:3000/profile/personal-details?comeFrom=http://localhost:3000/facilitators?auth=login
        //     const comeFrom = new URL(url, baseUrl).searchParams.get("comeFrom");
        //     const error = new URL(url, baseUrl).searchParams.get("error");
        //     console.log("==========================================================================> comeFrom error", comeFrom, error);
        //     if (comeFrom) {
        //         const referer = new URL(comeFrom, baseUrl).searchParams.set("comeFrom", comeFrom);
        //         return referer;
        //     }
        //     return url.startsWith(baseUrl) ? url : baseUrl;
        // },
    },
    // Unique cookie name for user authentication
    cookies: {
        sessionToken: {
            name: `next-auth.session-token.user`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: process.env.NODE_ENV === "production",
            },
        },
    },
    // secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)