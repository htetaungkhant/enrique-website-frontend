import { getCeremonies } from '@/lib/inhouseAPI/ceremony-route';

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const ceremonies = await getCeremonies(req);
            res.status(200).json(ceremonies);
        } catch (error) {
            console.error("Error fetching ceremonies:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    else if (req.method === "PUT") { }
    else if (req.method === "DELETE") { }
    else {
        res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}