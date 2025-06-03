import { createNewsLetter, deleteNewsLetter } from '@/lib/inhouseAPI/newsletter-route';

export default async function handler(req, res) {
    if (req.method === "GET") { }
    else if (req.method === "POST") {
        try {
            const newNewsLetter = await createNewsLetter(req);
            if (newNewsLetter) {
                res.status(200).json(newNewsLetter);
            } else {
                res.status(400).json({ error: "Failed to create newsletter" });
            }
        } catch (error) {
            console.error("Error creating newsletter:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    else if (req.method === "DELETE") {
        try {
            const deletedNewsLetter = await deleteNewsLetter(req);
            if (deletedNewsLetter) {
                res.status(200).json(deletedNewsLetter);
            } else {
                res.status(400).json({ error: "Failed to delete newsletter" });
            }
        } catch (error) {
            console.error("Error deleting newsletter:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    else {
        res.setHeader("Allow", ["GET", "POST", "DELETE"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}