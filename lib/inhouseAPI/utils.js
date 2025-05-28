import { getToken } from 'next-auth/jwt';

export async function getInHouseToken(req) {
    try {
        const secret = process.env.NEXTAUTH_SECRET;
        const nextAuthToken = await getToken({
            req,
            secret,
            cookieName: "next-auth.session-token.admin"
        });

        return nextAuthToken?.token || null;
    }
    catch (error) {
        console.error("Error getting in-house token:", error);
        throw error;
    }
}