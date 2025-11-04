export default function Success() {
  return (
    <div className="container" style={{ padding: "80px 0", textAlign: "center" }}>
      <h2>✅ Pago exitoso</h2>
      <p style={{ color: "var(--text-gray)" }}>Gracias por tu compra. Te vamos a contactar por Instagram o email para coordinar envío.</p>
      <a className="btn" href="/">Volver a la tienda</a>
    </div>
  );
}
