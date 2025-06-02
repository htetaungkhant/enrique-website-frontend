import formidable from 'formidable';

import { createCeremony, deleteCeremony } from '@/lib/inhouseAPI/ceremony-route';
import { filterDateMessages } from '@/lib/inhouseAPI/utils';

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
                images: files.images,
                image: files.image,
                hostNames: JSON.parse(fields.hostNames),
                location: JSON.parse(fields.location),
                extraDetails: JSON.parse(fields.extraDetails),
            };

            const newCeremony = await createCeremony(req);
            if (newCeremony) {
                const errors = filterDateMessages(newCeremony);
                if (errors.length > 0) {
                    res.status(400).json({ errors });
                }
                else if (newCeremony?.errors) {
                    res.status(400).json(newCeremony);
                }
                else if (newCeremony?.error) {
                    res.status(400).json(newCeremony);
                }
                else {
                    res.status(201).json(newCeremony);
                }
            } else {
                res.status(400).json({ error: "Failed to create ceremony" });
            }
        } catch (error) {
            console.error("Error creating ceremony:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    else if (req.method === "DELETE") {
        try {
            const body = await parseDeleteBody(req);
            req.body = body;

            const deletedCeremony = await deleteCeremony(req);
            if (deletedCeremony) {
                res.status(200).json(deletedCeremony);
            } else {
                res.status(400).json({ error: "Failed to delete ceremony" });
            }
        } catch (error) {
            console.error("Error deleting ceremony:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    else {
        res.setHeader("Allow", ["GET", "POST", "DELETE"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}