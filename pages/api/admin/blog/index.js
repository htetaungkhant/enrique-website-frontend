import formidable from 'formidable';

import { createBlog, deleteBlog } from '@/lib/inhouseAPI/blog-route';

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
            req.body = {
                ...fields,
                image: files.image,
            };

            const newBlog = await createBlog(req);
            if (newBlog) {
                res.status(200).json(newBlog);
            } else {
                res.status(400).json({ error: "Failed to create blog" });
            }
        } catch (error) {
            console.error("Error creating blog:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    else if (req.method === "DELETE") {
        try {
            const body = await parseDeleteBody(req);
            req.body = body;

            const deletedBlog = await deleteBlog(req);
            if (deletedBlog) {
                res.status(200).json(deletedBlog);
            } else {
                res.status(400).json({ error: "Failed to delete blog" });
            }
        } catch (error) {
            console.error("Error deleting blog:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    else {
        res.setHeader("Allow", ["GET", "POST", "DELETE"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}