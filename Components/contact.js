export default function Contact() {
  return (
    <section id="contacto" className="container" style={{ padding: "60px 0" }}>
      <h2 className="section-title" style={{ textAlign: "center", fontSize: "2.2em", fontWeight: 800 }}>Contacto</h2>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <div style={{ display: "grid", gap: 16, marginTop: 24 }}>
          <a href="https://instagram.com/kilometrozerokmz" target="_blank" className="card" style={{ padding: 20, display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: "1.8em" }}>📱</span>
            <div><strong>Instagram</strong><br />@kilometrozerokmz</div>
          </a>
          <a href="mailto:kilometrozerokz@gmail.com" className="card" style={{ padding: 20, display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: "1.8em" }}>✉️</span>
            <div><strong>Email</strong><br />kilometrozerokz@gmail.com</div>
          </a>
          <div className="card" style={{ padding: 20, display: "flex", alignItems: "center", gap: 12, opacity: 0.6 }}>
            <span style={{ fontSize: "1.8em" }}>💬</span>
            <div><strong>WhatsApp</strong><br />Próximamente</div>
          </div>
        </div>
      </div>
    </section>
  );
}
