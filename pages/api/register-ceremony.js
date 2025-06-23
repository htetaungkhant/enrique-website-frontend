import { registerCeremony } from '@/lib/inhouseAPI/ceremony-route';

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const { id, orderId } = req.body;
            if (!id || !orderId) {
                return res.status(400).json({ error: "Ceremony ID and Order ID are required" });
            }

            const result = await registerCeremony(req);
            if (result) {
                return res.status(200).json({ message: "Ceremony registered successfully" });
            } else {
                return res.status(400).json({ error: "Failed to register ceremony" });
            }
        } catch (error) {
            console.error("Error registering ceremony:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}