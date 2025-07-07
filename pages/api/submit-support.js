import { createSupport } from '@/lib/inhouseAPI/support-route';

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const result = await createSupport(req);

            if (result?.error) {
                return res.status(400).json({ message: result?.error });
            }
            else if (result?.errors) {
                return res.status(400).json({ message: "Failed to submit support request" });
            }

            return res.status(200).json({
                success: true,
                message: 'Support request submitted successfully'
            });
        } catch (error) {
            console.error("Error submitting support request:", error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}