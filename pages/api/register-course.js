import { registerCourse } from '@/lib/inhouseAPI/course-route';

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const { id } = req.body;
            if (!id) {
                return res.status(400).json({ error: "Course ID is required" });
            }

            const result = await registerCourse(req);
            if (result) {
                return res.status(200).json({ message: "Course registered successfully" });
            } else {
                return res.status(400).json({ error: "Failed to register course" });
            }
        } catch (error) {
            console.error("Error registering course:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}