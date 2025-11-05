import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Shop from "../components/Shop";
import About from "../components/About";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Shop />
      <About />
      <Contact />
      <footer style={{ padding: "40px 5%", background: "#000", textAlign: "center", borderTop: "1px solid var(--border)", color: "#777" }}>
        © 2025 KMZ — Todos los derechos reservados. | Diseñado con 🔥 por KilometroZero
      </footer>
    </>
  );
}
