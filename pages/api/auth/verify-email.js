import { verifyEmail } from "@/lib/inhouseAPI/auth-route";

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const result = await verifyEmail(req);

            if (!result) {
                return res.status(400).json({
                    message: 'Failed to verify email'
                });
            }

            // Check if there's an error message in the result
            if (result.error) {
                return res.status(400).json({ message: result.error });
            }

            return res.status(200).json({
                success: true,
                message: 'Account verified successfully!'
            });
        } catch (error) {
            console.error("Error verifying email:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}