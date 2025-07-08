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

  const form = formidable();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error parsing form:', err);
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
