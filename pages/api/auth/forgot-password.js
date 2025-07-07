import { forgotPassword } from "@/lib/inhouseAPI/auth-route";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }

    try {
        const result = await forgotPassword(req);

        if (!result) {
            return res.status(400).json({
                message: 'An error occurred while processing your request. Please try again later.'
            });
        }

        // Check if there's an error message in the result
        if (result.error) {
            return res.status(400).json({ message: result.error });
        }

        return res.status(200).json({
            success: true,
            message: 'Password reset instructions have been sent to your email.'
        });
    } catch (error) {
        console.error('Error processing forgot password:', error);
        return res.status(500).json({
            message: 'An internal error occurred. Please try again later.'
        });
    }
}

// export default async function handler(req, res) {
//     if (req.method === "POST") {
//         try {
//             const result = await forgotPassword(req);
//             if (result) {
//                 res.status(200).json(result);
//             } else {
//                 res.status(400).json({ error: "Failed to process forgot password request" });
//             }
//         } catch (error) {
//             console.error("Error processing forgot password:", error);
//             res.status(500).json({ error: "Internal Server Error" });
//         }
//     }
//     else {
//         res.setHeader("Allow", ["POST"]);
//         res.status(405).end(`Method ${req.method} Not Allowed`);
//     }
// }