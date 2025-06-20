import { createSupport, deleteSupport } from '@/lib/inhouseAPI/support-route';

export default async function handler(req, res) {
    if (req.method === "GET") { }
    else if (req.method === "POST") {
        try {
            const newSupportLetter = await createSupport(req);
            if (newSupportLetter) {
                res.status(200).json(newSupportLetter);
            } else {
                res.status(400).json({ error: "Failed to create support letter" });
            }
        } catch (error) {
            console.error("Error creating support letter:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    else if (req.method === "DELETE") {
        try {
            const deletedSupportLetter = await deleteSupport(req);
            if (deletedSupportLetter) {
                res.status(200).json(deletedSupportLetter);
            } else {
                res.status(400).json({ error: "Failed to delete support letter" });
            }
        } catch (error) {
            console.error("Error deleting support letter:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    else {
        res.setHeader("Allow", ["GET", "POST", "DELETE"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}