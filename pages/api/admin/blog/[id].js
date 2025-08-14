import formidable from 'formidable';

import { updateBlog } from '@/lib/inhouseAPI/blog-route';

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
    else if (req.method === "PUT") {
        try {
            const { id } = req.query;
            const { fields, files } = await parseForm(req);

            req.body = {
                id,
                ...fields,
                image: files?.image || (fields?.image ? JSON.parse(fields.image) : undefined),
            };

            const updatedBlog = await updateBlog(req);
            if (updatedBlog) {
                res.status(200).json(updatedBlog);
            } else {
                res.status(400).json({ error: "Failed to update blog" });
            }
        } catch (error) {
            console.error('Error updating blog:', error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    else {
        res.setHeader("Allow", ["GET", "PUT"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}