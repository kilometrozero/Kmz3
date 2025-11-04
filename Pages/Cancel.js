export default function Cancel() {
  return (
    <div className="container" style={{ padding: "80px 0", textAlign: "center" }}>
      <h2>❌ Pago cancelado</h2>
      <p style={{ color: "var(--text-gray)" }}>No pasa nada. Podés intentar de nuevo cuando quieras.</p>
      <a className="btn" href="/">Volver a la tienda</a>
    </div>
  );
}
