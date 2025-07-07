import { updateBlog } from '@/lib/inhouseAPI/blog-route';

export default async function handler(req, res) {
    if (req.method === "GET") { }
    else if (req.method === "PUT") {
        try {
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