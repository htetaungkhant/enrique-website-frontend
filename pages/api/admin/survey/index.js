import { createSurvey, deleteSurvey } from '@/lib/inhouseAPI/survey-route';

export default async function handler(req, res) {
    if (req.method === "GET") { }
    else if (req.method === "POST") {
        try {
            const newSurvey = await createSurvey(req);

            if (newSurvey.error) {
                return res.status(400).json({ message: newSurvey.error });
            }
            else if (newSurvey.errors) {
                return res.status(400).json({ message: "Failed to create survey" });
            }

            return res.status(200).json({
                success: true,
                message: 'Survey created successfully'
            });
        } catch (error) {
            console.error("Error creating survey:", error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
    else if (req.method === "DELETE") {
        try {
            const deletedSurvey = await deleteSurvey(req);

            if (deletedSurvey.error) {
                return res.status(400).json({ message: deletedSurvey.error });
            }

            return res.status(200).json({
                success: true,
                message: 'Failed to delete survey'
            });
        } catch (error) {
            console.error("Error deleting survey:", error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
    else {
        res.setHeader("Allow", ["GET", "POST", "DELETE"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}