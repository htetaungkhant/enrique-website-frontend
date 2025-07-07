import formidable from 'formidable';
import { updateCeremony } from '@/lib/inhouseAPI/ceremony-route';
import { filterDateMessages } from '@/lib/inhouseAPI/utils';

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
                gallery: files.gallery || (fields.existingGallery ? JSON.parse(fields.existingGallery) : undefined),
                images: files.images || (fields.existingImages ? JSON.parse(fields.existingImages) : undefined),
                image: files.image || (fields.existingImage ? JSON.parse(fields.existingImage) : undefined),
                hostNames: JSON.parse(fields.hostNames),
                location: JSON.parse(fields.location),
                extraDetails: JSON.parse(fields.extraDetails),
                deletedGalleryImages: fields.deletedGalleryImages ? JSON.parse(fields.deletedGalleryImages) : [],
            };

            const updatedCeremony = await updateCeremony(req);
            if (updatedCeremony) {
                const errors = filterDateMessages(updatedCeremony);
                if (errors.length > 0) {
                    res.status(400).json({ errors });
                }
                else if (updatedCeremony?.errors) {
                    res.status(400).json(updatedCeremony);
                }
                else if (updatedCeremony?.error) {
                    res.status(400).json(updatedCeremony);
                }
                else {
                    res.status(200).json(updatedCeremony);
                }
            } else {
                res.status(400).json({ error: "Failed to update ceremony" });
            }
        } catch (error) {
            console.error('Error updating ceremony:', error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    else {
        res.setHeader("Allow", ["GET", "PUT"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}