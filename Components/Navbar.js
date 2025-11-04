import { useState, useEffect } from "react";
import { sounds } from "@/lib/sounds";

export default function Navbar({ onDashboard }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img
            src="/logo.svg"
            alt="KMZ Logo"
            style={{ width: 48, height: 48, borderRadius: "50%", cursor: "pointer" }}
            onMouseEnter={() => sounds.hover.play()}
          />
          <h1 className="logo">KilometroZero</h1>
        </div>
        <nav style={{ display: "flex", gap: 24 }}>
          <a href="#inicio">Inicio</a>
          <a href="#tienda">Tienda</a>
          <a href="#sobre">Sobre KMZ</a>
          <a href="#contacto">Contacto</a>
          <button
            className="btn"
            onClick={() => {
              sounds.click.play();
              onDashboard?.();
            }}
            style={{ padding: "8px 16px" }}
          >
            Dashboard
          </button>
        </nav>
      </div>
    </header>
  );
}
