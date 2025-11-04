export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ ok: false });
  const { password } = req.body || {};
  if (!password) return res.status(400).json({ ok: false, error: "Missing password" });
  const ok = password === process.env.ADMIN_PASSWORD;
  res.json({ ok });
}
