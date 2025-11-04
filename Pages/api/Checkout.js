import Stripe from "stripe";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ ok: false });
  const { product } = req.body || {};
  if (!product || !product.name || !product.price) {
    return res.status(400).json({ ok: false, error: "Missing product fields" });
  }

  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  const siteUrl = process.env.SITE_URL || "http://localhost:3000";
  if (!stripeSecret) return res.status(500).json({ ok: false, error: "Stripe not configured" });

  const stripe = new Stripe(stripeSecret);

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{
        price_data: {
          currency: "ars",
          product_data: { name: product.name },
          unit_amount: product.price * 100
        },
        quantity: 1
      }],
      mode: "payment",
      success_url: `${siteUrl}/success`,
      cancel_url: `${siteUrl}/cancel`
    });
    res.json({ ok: true, url: session.url });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
}
