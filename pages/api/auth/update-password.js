import { updateUserPassword } from "@/lib/inhouseAPI/auth-route";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }

    try {
        const result = await updateUserPassword(req);

        if (!result) {
            return res.status(400).json({
                message: 'An error occurred while processing your request. Please try again later.'
            });
        }

        if (result.error) {
            return res.status(400).json({ message: result.error });
        }
        if (result.errors) {
            return res.status(400).json({ message: result.errors?.[0]?.message });
        }

        return res.status(200).json({
            success: true,
            message: 'Password updated successfully. You can now log in with your new password.'
        });
    } catch (error) {
        console.error('Error processing update password:', error);
        return res.status(500).json({
            message: 'An internal error occurred. Please try again later.'
        });
    }
}