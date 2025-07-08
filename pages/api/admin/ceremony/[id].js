import formidable from 'formidable';
import { updateCeremony } from '@/lib/inhouseAPI/ceremony-route';
import { filterDateMessages } from '@/lib/inhouseAPI/utils';

const parseForm = async (req) => {
    return new Promise((resolve, reject) => {
        const form = formidable({
            // Stay well under API Gateway's 10MB limit
            maxFileSize: 8 * 1024 * 1024, // 8MB per file
            maxTotalFileSize: 8 * 1024 * 1024, // 8MB total
            maxFieldsSize: 2 * 1024 * 1024, // 2MB for fields
            keepExtensions: true,

            onFileSizeExceeded: (file) => {
                reject(new Error(`File ${file.originalFilename} exceeds 8MB limit`));
            }
        });

        form.parse(req, (err, fields, files) => {
            if (err) {
                if (err.httpCode === 413) {
                    return reject(new Error('Request entity too large'));
                }
                if (err.code === 1009) { // LIMIT_FILE_SIZE
                    return reject(new Error('File size exceeds limit'));
                }
                if (err.code === 1010) { // LIMIT_FILE_COUNT
                    return reject(new Error('Too many files uploaded'));
                }
                if (err.code === 1011) { // LIMIT_FIELD_KEY
                    return reject(new Error('Field name too long'));
                }
                if (err.code === 1012) { // LIMIT_FIELD_VALUE
                    return reject(new Error('Field value too long'));
                }
                if (err.code === 1013) { // LIMIT_FIELD_COUNT
                    return reject(new Error('Too many fields'));
                }
                if (err.code === 1014) { // LIMIT_UNEXPECTED_FILE
                    return reject(new Error('Unexpected file upload'));
                }
                return reject(err);
            }
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
            res.status(500).json({ error: error.message || "Internal Server Error" });
        }
    }
    else {
        res.setHeader("Allow", ["GET", "PUT"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}