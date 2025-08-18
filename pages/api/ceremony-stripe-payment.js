import { ceremonyStripeCheckout } from "@/lib/inhouseAPI/payment-route";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const result = await ceremonyStripeCheckout(req);
    if (result) {
      return res.status(200).json(result);
    } else {
      return res.status(500).json({ error: "Payment processing failed." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
