export default function About() {
  return (
    <section id="sobre" className="container" style={{ padding: "60px 0" }}>
      <h2 className="section-title" style={{ textAlign: "center", fontSize: "2.2em", fontWeight: 800 }}>Sobre KMZ</h2>
      <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
        <p style={{ fontSize: "1.2em", lineHeight: 1.7, color: "var(--text-gray)" }}>
          KilometroZero es más que una marca: es una forma de expresar tu estilo sin límites. Nacimos para romper las reglas y crear una nueva cultura urbana donde la autenticidad es lo único que importa.
        </p>

        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20, marginTop: 40 }}>
          <div className="card" style={{ padding: 24 }}>
            <div style={{ fontSize: "2em", marginBottom: 10 }}>🔥</div>
            <h3 style={{ marginBottom: 8, fontSize: "1.1em" }}>Diseño Único</h3>
            <p style={{ color: "var(--text-gray)" }}>Piezas exclusivas que no encontrarás en otro lado</p>
          </div>
          <div className="card" style={{ padding: 24 }}>
            <div style={{ fontSize: "2em", marginBottom: 10 }}>⚡</div>
            <h3 style={{ marginBottom: 8, fontSize: "1.1em" }}>Calidad Premium</h3>
            <p style={{ color: "var(--text-gray)" }}>Materiales de primera selección</p>
          </div>
          <div className="card" style={{ padding: 24 }}>
            <div style={{ fontSize: "2em", marginBottom: 10 }}>💎</div>
            <h3 style={{ marginBottom: 8, fontSize: "1.1em" }}>Estilo Urbano</h3>
            <p style={{ color: "var(--text-gray)" }}>La esencia de la calle en cada prenda</p>
          </div>
        </div>
      </div>
    </section>
  );
            }
