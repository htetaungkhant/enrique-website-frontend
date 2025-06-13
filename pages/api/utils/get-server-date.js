export default function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const currentDate = new Date();
        res.status(200).json({ date: currentDate.toISOString() });
    } catch (error) {
        res.status(500).json({ message: 'Failed to get server date' });
    }
}
