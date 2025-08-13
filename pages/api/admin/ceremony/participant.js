import { createCeremonyParticipant, deleteCeremonyParticipant } from '@/lib/inhouseAPI/participant-route';

export default async function handler(req, res) {
    if (req.method === "GET") { }
    else if (req.method === "POST") {
        try {
            const newParticipant = await createCeremonyParticipant(req);
            if (newParticipant) {
                res.status(200).json(newParticipant);
            } else {
                res.status(400).json({ error: "Failed to create participant" });
            }
        } catch (error) {
            console.error("Error creating participant:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    else if (req.method === "DELETE") {
        try {
            const deletedParticipant = await deleteCeremonyParticipant(req);
            if (deletedParticipant) {
                res.status(200).json(deletedParticipant);
            } else {
                res.status(400).json({ error: "Failed to delete participant" });
            }
        } catch (error) {
            console.error("Error deleting participant:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    else {
        res.setHeader("Allow", ["GET", "POST", "DELETE"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}