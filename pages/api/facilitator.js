import { getFacilitators } from "@/lib/inhouseAPI/facilitator-route";

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const facilitators = await getFacilitators(req);
            res.status(200).json(facilitators);
        } catch (error) {
            console.error("Error fetching facilitators:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}