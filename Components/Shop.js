import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";

export default function Shop() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data.products || []);
    }
    load();
  }, []);

  const onBuy = async (product) => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product })
    });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("No se pudo iniciar el checkout.");
    }
  };

  // Registrar vistas al cargar
  useEffect(() => {
    products.forEach(async (p) => {
      await fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: p.id })
      });
    });
  }, [products]);

  return (
    <section id="tienda" className="container" style={{ padding: "60px 0" }}>
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ textAlign: "center", fontSize: "2.4em", fontWeight: 800 }}
      >
        Tienda
      </motion.h2>

      <div className="grid grid-3" style={{ marginTop: 24 }}>
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onBuy={onBuy} />
        ))}
      </div>
    </section>
  );
          }
