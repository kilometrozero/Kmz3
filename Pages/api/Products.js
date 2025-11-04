import { getDb, memoryStore } from "@/lib/db";
import { v4 as uuid } from "uuid";

export default async function handler(req, res) {
  const db = await getDb();

  if (req.method === "GET") {
    if (db) {
      const items = await db.collection("products").find({}).sort({ _id: -1 }).toArray();
      return res.json({ products: items });
    }
    return res.json({ products: memoryStore.products });
  }

  if (req.method === "POST") {
    const body = req.body || {};
    const product = {
      id: uuid(),
      name: body.name,
      price: body.price,
      stock: body.stock ?? 0,
      description: body.description || "",
      image: body.image || "",
      category: body.category || "KMZ",
      views: 0
    };
    if (db) {
      await db.collection("products").insertOne(product);
    } else {
      memoryStore.products.unshift(product);
    }
    return res.json({ ok: true, product });
  }

  if (req.method === "PUT") {
    const { id, ...fields } = req.body || {};
    if (!id) return res.status(400).json({ ok: false, error: "Missing id" });
    if (db) {
      await db.collection("products").updateOne({ id }, { $set: fields });
    } else {
      const idx = memoryStore.products.findIndex(p => p.id === id);
      if (idx >= 0) memoryStore.products[idx] = { ...memoryStore.products[idx], ...fields };
    }
    return res.json({ ok: true });
  }

  if (req.method === "DELETE") {
    const id = req.query.id;
    if (!id) return res.status(400).json({ ok: false, error: "Missing id" });
    if (db) {
      await db.collection("products").deleteOne({ id });
    } else {
      memoryStore.products = memoryStore.products.filter(p => p.id !== id);
    }
    return res.json({ ok: true });
  }

  return res.status(405).json({ ok: false, error: "Method not allowed" });
}
