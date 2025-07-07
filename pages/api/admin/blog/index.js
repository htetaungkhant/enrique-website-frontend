import { createBlog, deleteBlog } from '@/lib/inhouseAPI/blog-route';

export default async function handler(req, res) {
    if (req.method === "GET") { }
    else if (req.method === "POST") {
        try {
            const newBlog = await createBlog(req);
            if (newBlog) {
                res.status(200).json(newBlog);
            } else {
                res.status(400).json({ error: "Failed to create blog" });
            }
        } catch (error) {
            console.error("Error creating blog:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    else if (req.method === "DELETE") {
        try {
            const deletedBlog = await deleteBlog(req);
            if (deletedBlog) {
                res.status(200).json(deletedBlog);
            } else {
                res.status(400).json({ error: "Failed to delete blog" });
            }
        } catch (error) {
            console.error("Error deleting blog:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    else {
        res.setHeader("Allow", ["GET", "POST", "DELETE"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}