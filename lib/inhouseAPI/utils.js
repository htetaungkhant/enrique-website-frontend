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

export function filterDateMessages(responseData) {
    if (responseData) {
        const { errors } = responseData;
        if (Array.isArray(errors)) {
            return errors
                .filter(error =>
                    error?.field?.includes("startDate") ||
                    error?.message?.includes("Start date") ||
                    error?.field?.includes("endDate") ||
                    error?.message?.includes("End date") ||
                    error?.message?.includes("must be in the future")
                )
                .map(error => error?.message);
        }
    }
    return [];
}