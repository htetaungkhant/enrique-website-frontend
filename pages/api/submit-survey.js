import { submitSurvey } from '@/lib/inhouseAPI/survey-route';

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const result = await submitSurvey(req);

            if (result?.error) {
                return res.status(400).json({ message: result?.error });
            }
            else if (result?.errors) {
                return res.status(400).json({ message: "Failed to submit survey" });
            }

            return res.status(200).json({
                success: true,
                message: 'Survey submitted successfully'
            });
        } catch (error) {
            console.error("Error submitting survey:", error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}