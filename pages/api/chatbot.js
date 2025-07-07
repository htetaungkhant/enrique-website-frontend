const chatbot_route = `${process.env.CHATBOT_URL}/chat`; // body: { prompt: "question" }

export const getChatbotResponse = async (prompt) => {
    try {
        const response = await fetch(chatbot_route, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching chatbot response:", error);
        throw error;
    }
}

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: "Prompt is required" });
        }

        try {
            const response = await getChatbotResponse(prompt);
            return res.status(200).json(response);
        } catch (error) {
            console.error("Error in chatbot handler:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}