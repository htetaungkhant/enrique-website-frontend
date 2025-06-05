import { signupUser, updateUser } from "@/lib/inhouseAPI/auth-route";

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const newUser = await signupUser(req);
            if (newUser) {
                res.status(201).json(newUser);
            } else {
                res.status(400).json({ error: "Failed to create user" });
            }
        } catch (error) {
            console.error("Error creating user:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    } else if (req.method === "PUT") {
        try {
            const updatedUser = await updateUser(req);
            if (updatedUser) {
                res.status(200).json(updatedUser);
            } else {
                res.status(400).json({ error: "Failed to update user" });
            }
        } catch (error) {
            console.error("Error updating user:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        res.setHeader("Allow", ["POST", "PUT"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}