import { getDb, memoryStore } from "@/lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ ok: false });
  const { productId } = req.body || {};
  if (!productId) return res.status(400).json({ ok: false, error: "Missing productId" });
  const db = await getDb();
  if (db) {
    await db.collection("products").updateOne({ id: productId }, { $inc: { views: 1 } });
  } else {
    const p = memoryStore.products.find(x => x.id === productId);
    if (p) p.views = (p.views || 0) + 1;
  }
  res.json({ ok: true });
}
