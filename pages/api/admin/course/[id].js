import { getCourseDetails } from '@/lib/inhouseAPI/course-route';

export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === "GET") {
        try {
            req.body = { id };
            const course = await getCourseDetails(req);
            if (course) {
                res.status(200).json(course);
            } else {
                res.status(404).json({ error: "Course not found" });
            }
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}