import { updateSurvey } from '@/lib/inhouseAPI/survey-route';

export default async function handler(req, res) {
    if (req.method === "GET") { }
    else if (req.method === "PUT") {
        try {
            const updatedSurvey = await updateSurvey(req);
            if (updatedSurvey) {
                res.status(200).json(updatedSurvey);
            } else {
                res.status(400).json({ error: "Failed to update survey" });
            }
        } catch (error) {
            console.error('Error updating survey:', error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    else {
        res.setHeader("Allow", ["GET", "PUT"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}