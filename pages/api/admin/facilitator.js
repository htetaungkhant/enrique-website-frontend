import formidable from 'formidable';

import { getFacilitators, createFacilitator, updateFacilitator, deleteFacilitator } from "@/lib/inhouseAPI/facilitator-route"

// For DELETE requests we need the body parser
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
    if (req.method === "GET") {
        try {
            const facilitators = await getFacilitators(req);
            res.status(200).json(facilitators);
        } catch (error) {
            console.error("Error fetching facilitators:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    else if (req.method === "POST") {
        try {
            const { fields, files } = await parseForm(req);

            // Create a new request object with the parsed data
            req.body = {
                ...fields,
                image: files.image,
                areaOfExpertise: JSON.parse(fields.areaOfExpertise),
                workAndImpact: JSON.parse(fields.workAndImpact)
            };

            const newFacilitator = await createFacilitator(req);
            if (newFacilitator) {
                res.status(201).json(newFacilitator);
            } else {
                res.status(400).json({ error: "Failed to create facilitator" });
            }
        } catch (error) {
            console.error("Error creating facilitator:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    else if (req.method === "PUT") {
        try {
            const { fields, files } = await parseForm(req);

            // Create a new request object with the parsed data
            req.body = {
                ...fields,
                image: files.image,
                areaOfExpertise: JSON.parse(fields.areaOfExpertise),
                workAndImpact: JSON.parse(fields.workAndImpact)
            };

            const updatedFacilitator = await updateFacilitator(req);
            if (updatedFacilitator) {
                res.status(200).json(updatedFacilitator);
            } else {
                res.status(400).json({ error: "Failed to update facilitator" });
            }
        } catch (error) {
            console.error("Error updating facilitator:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    else if (req.method === "DELETE") {
        try {
            // Parse the body for DELETE requests
            const body = await parseDeleteBody(req);
            req.body = body;

            const deletedFacilitator = await deleteFacilitator(req);
            if (deletedFacilitator) {
                res.status(200).json(deletedFacilitator);
            } else {
                res.status(400).json({ error: "Failed to delete facilitator" });
            }
        } catch (error) {
            console.error("Error deleting facilitator:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    else {
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}