import formidable from 'formidable';

import { createCourse, updateCourse, deleteCourse } from '@/lib/inhouseAPI/course-route';

const parseDeleteBody = async (req) => {
    const chunks = [];
    for await (const chunk of req) {
        chunks.push(chunk);
    }
    const data = Buffer.concat(chunks).toString();
    return JSON.parse(data);
};

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
    if (req.method === "GET") { }
    else if (req.method === "POST") {
        try {
            const { fields, files } = await parseForm(req);

            // Create a new request object with the parsed data
            req.body = {
                ...fields,
                courseImage: files.courseImage,
                createdByImage: files.createdByImage,
                extraDetails: JSON.parse(fields.extraDetails),
                courseVideos: JSON.parse(fields.courseVideos)
            };

            const newCourse = await createCourse(req);
            if (newCourse) {
                res.status(201).json(newCourse);
            } else {
                res.status(400).json({ error: "Failed to create course" });
            }
        } catch (error) {
            console.error("Error creating course:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    else if (req.method === "PUT") {
        try {
            const { fields, files } = await parseForm(req);

            // Create a new request object with the parsed data
            req.body = {
                ...fields,
                courseImage: files.courseImage,
                createdByImage: files.createdByImage,
                extraDetails: JSON.parse(fields.extraDetails),
                courseVideos: JSON.parse(fields.courseVideos)
            };

            const updatedCourse = await updateCourse(req);
            if (updatedCourse) {
                res.status(200).json(updatedCourse);
            } else {
                res.status(400).json({ error: "Failed to update course" });
            }
        } catch (error) {
            console.error("Error updating course:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    else if (req.method === "DELETE") {
        try {
            const body = await parseDeleteBody(req);
            req.body = body;

            const deletedCourse = await deleteCourse(req);
            if (deletedCourse) {
                res.status(200).json(deletedCourse);
            } else {
                res.status(400).json({ error: "Failed to delete course" });
            }
        } catch (error) {
            console.error("Error deleting course:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    else {
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}