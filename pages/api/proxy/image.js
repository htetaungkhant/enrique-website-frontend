export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const imageUrl = req.query.url;

    if (!imageUrl) {
        return res.status(400).json({ message: 'Image URL is required' });
    }

    try {
        const response = await fetch(imageUrl);
        
        if (!response.ok) throw new Error('Failed to fetch image');

        const contentType = response.headers.get('content-type');
        const arrayBuffer = await response.arrayBuffer();

        res.setHeader('Content-Type', contentType);
        res.send(Buffer.from(arrayBuffer));
    } catch (error) {
        console.error('Error proxying image:', error);
        res.status(500).json({ message: 'Failed to fetch image' });
    }
}
