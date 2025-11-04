import { motion } from "framer-motion";
import Image from "next/image";
import { sounds } from "@/lib/sounds";

export default function ProductCard({ product, onBuy }) {
  return (
    <motion.div
      className="card"
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 220 }}
      onMouseEnter={() => sounds.hover.play()}
      style={{ overflow: "hidden" }}
    >
      <div style={{ position: "relative", height: 260, background: "#222" }}>
        {product.image ? (
          <Image
            src={product.image.startsWith("http") ? product.image : product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>KMZ</div>
        )}
        <span style={{
          position: "absolute", top: 12, right: 12,
          background: "var(--primary)", color: "#fff",
          padding: "6px 12px", borderRadius: 999, fontSize: ".85em", fontWeight: 600
        }}>
          {product.category || "KMZ"}
        </span>
      </div>
      <div style={{ padding: 18 }}>
        <h3 style={{ fontSize: "1.2em", marginBottom: 8, fontWeight: 600 }}>{product.name}</h3>
        <p style={{ color: "var(--text-gray)", fontSize: ".95em" }}>{product.description || "Producto exclusivo KMZ"}</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
          <span className="price">${(product.price ?? 0).toLocaleString("es-AR")}</span>
          <span style={{ color: product.stock > 0 ? "#7CFC00" : "#f55", fontWeight: 600 }}>
            Stock: {product.stock ?? 0}
          </span>
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
          <button className="btn" onClick={() => { sounds.click.play(); onBuy?.(product); }} style={{ flex: 1 }}>
            Comprar
          </button>
          <button
            className="btn"
            onClick={() => { navigator.clipboard.writeText(product.description || "Producto KMZ"); sounds.success.play(); }}
            style={{ flex: 1, background: "transparent", border: "2px solid var(--border)", boxShadow: "none" }}
          >
            Detalles
          </button>
        </div>
      </div>
    </motion.div>
  );
}
