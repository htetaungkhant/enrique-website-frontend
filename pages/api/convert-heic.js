import formidable from 'formidable';
import fs from 'fs';
import heicConvert from 'heic-convert';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = formidable({
    // Stay well under API Gateway's 10MB limit
    maxFileSize: 8 * 1024 * 1024, // 8MB per file
    maxTotalFileSize: 8 * 1024 * 1024, // 8MB total
    maxFieldsSize: 2 * 1024 * 1024, // 2MB for fields
    keepExtensions: true,

    onFileSizeExceeded: (file) => {
      res.status(500).json({ error: `File ${file.originalFilename} exceeds 8MB limit` });
    }
  });
  form.parse(req, async (err, fields, files) => {
    if (err) {
      if (err.httpCode === 413) {
        return res.status(500).json({ error: 'Request entity too large. Should be less than 8MB!' });
      }
      if (err.code === 1009) { // LIMIT_FILE_SIZE
        return res.status(500).json({ error: 'File size exceeds limit' });
      }
      if (err.code === 1010) { // LIMIT_FILE_COUNT
        return res.status(500).json({ error: 'Too many files uploaded' });
      }
      if (err.code === 1011) { // LIMIT_FIELD_KEY
        return res.status(500).json({ error: 'Field name too long' });
      }
      if (err.code === 1012) { // LIMIT_FIELD_VALUE
        return res.status(500).json({ error: 'Field value too long' });
      }
      if (err.code === 1013) { // LIMIT_FIELD_COUNT
        return res.status(500).json({ error: 'Too many fields' });
      }
      if (err.code === 1014) { // LIMIT_UNEXPECTED_FILE
        return res.status(500).json({ error: 'Unexpected file upload' });
      }
      return res.status(500).json({ error: 'Error parsing form data' });
    }
    let file = files.image;
    if (Array.isArray(file)) file = file[0];
    if (!file) {
      return res.status(400).json({ error: 'No image file provided' });
    }
    if (!file.mimetype || file.mimetype !== 'image/heic') {
      return res.status(400).json({ error: 'Invalid file type. Only HEIC images are supported.' });
    }
    try {
      const inputBuffer = fs.readFileSync(file.filepath);
      const outputBuffer = await heicConvert({
        buffer: inputBuffer,
        format: 'JPEG',
        quality: 0.5
      });
      fs.unlinkSync(file.filepath);
      res.setHeader('Content-Type', 'image/jpeg');
      res.send(Buffer.from(outputBuffer));
    } catch (error) {
      console.error('Error converting image:', error);
      res.status(500).json({ error: 'Failed to convert image' });
    }
  });
}
