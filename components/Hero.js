import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section id="inicio" style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container"
      >
        <h2 style={{
          fontSize: "4em",
          fontWeight: 900,
          background: "linear-gradient(135deg, #fff 0%, #ff0055 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginBottom: 12
        }}>
          Cero reglas.<br />Full estilo.
        </h2>
        <p style={{ color: "var(--text-gray)", fontSize: "1.3em", marginBottom: 24 }}>
          KMZ redefine la moda urbana con actitud y presencia.
        </p>
        <a href="#tienda" className="btn">Ver colección</a>
      </motion.div>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: [1, 0.6, 1] }}
        transition={{ repeat: Infinity, duration: 8 }}
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 20% 50%, rgba(255,0,85,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(255,107,157,0.1) 0%, transparent 50%)"
        }}
      />
    </section>
  );
}
