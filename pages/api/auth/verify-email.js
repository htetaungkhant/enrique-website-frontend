import { verifyEmail } from "@/lib/inhouseAPI/auth-route";

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const result = await verifyEmail(req);
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(400).json({ error: "Failed to verify email" });
            }
        } catch (error) {
            console.error("Error verifying email:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}