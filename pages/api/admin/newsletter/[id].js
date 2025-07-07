import { updateNewsLetter } from '@/lib/inhouseAPI/newsletter-route';

export default async function handler(req, res) {
    if (req.method === "GET") { }
    else if (req.method === "PUT") {
        try {
            const updatedNewsLetter = await updateNewsLetter(req);
            if (updatedNewsLetter) {
                res.status(200).json(updatedNewsLetter);
            } else {
                res.status(400).json({ error: "Failed to update newsletter" });
            }
        } catch (error) {
            console.error('Error updating newsletter:', error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    else {
        res.setHeader("Allow", ["GET", "PUT"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}