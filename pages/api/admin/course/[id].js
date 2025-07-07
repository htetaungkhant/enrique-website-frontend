import formidable from 'formidable';
import { getCourseDetails, updateCourse } from '@/lib/inhouseAPI/course-route';

const parseForm = async (req) => {
    return new Promise((resolve, reject) => {
        const form = formidable();
        form.parse(req, (err, fields, files) => {
            if (err) return reject(err);
            resolve({ fields, files });
        });
    });
};

export const config = {
    api: {
        bodyParser: false,
    },
};

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
    else if (req.method === "PUT") {
        try {
            const { fields, files } = await parseForm(req);

            req.body = {
                id,
                ...fields,
                courseImage: files.courseImage || (fields.existingCourseImage ? JSON.parse(fields.existingCourseImage) : undefined),
                createdByImage: files.createdByImage || (fields.existingCreatorImage ? JSON.parse(fields.existingCreatorImage) : undefined),
                extraDetails: JSON.parse(fields.extraDetails),
                courseVideos: JSON.parse(fields.courseVideos),
                deletedClasses: fields.deletedClasses ? JSON.parse(fields.deletedClasses) : []
            };

            const updatedCourse = await updateCourse(req);
            if (updatedCourse) {
                res.status(200).json(updatedCourse);
            } else {
                res.status(400).json({ error: "Failed to update course" });
            }
        } catch (error) {
            console.error('Error updating course:', error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    else {
        res.setHeader("Allow", ["GET", "PUT"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}