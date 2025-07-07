import formidable from 'formidable';

import { updateFacilitator } from "@/lib/inhouseAPI/facilitator-route";

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
            // const { id } = req.query;
            const { fields, files } = await parseForm(req);

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
    else {
        res.setHeader("Allow", ["GET", "PUT"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}