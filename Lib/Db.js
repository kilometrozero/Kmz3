import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

if (!uri || !dbName) {
  console.warn("MongoDB env vars missing. Falling back to in-memory store.");
}

let client;
let clientPromise;

const globalWithMongo = global;

if (!globalWithMongo._mongoClientPromise) {
  if (uri && dbName) {
    client = new MongoClient(uri);
    globalWithMongo._mongoClientPromise = client.connect();
  } else {
    globalWithMongo._mongoClientPromise = Promise.resolve(null);
  }
}
clientPromise = globalWithMongo._mongoClientPromise;

export async function getDb() {
  const connected = await clientPromise;
  if (!connected) return null;
  return connected.db(dbName);
}

// Simple in-memory fallback if no DB
const mem = {
  products: [
    {
      id: "seed-1",
      name: "Remera Oversize Negra",
      price: 25000,
      stock: 12,
      description: "Remera oversize de algodón premium. Diseño minimalista con logo KMZ bordado.",
      image: "/seed/remera-negra.png",
      category: "Remeras",
      views: 0
    },
    {
      id: "seed-2",
      name: "Buzo KMZ Blanco",
      price: 45000,
      stock: 8,
      description: "Buzo con capucha. Material premium con estampado exclusivo KMZ.",
      image: "/seed/buzo-blanco.png",
      category: "Buzos",
      views: 0
    }
  ]
};

export const memoryStore = mem;
