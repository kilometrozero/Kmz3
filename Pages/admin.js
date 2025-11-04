import { useEffect, useState } from "react";

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [tab, setTab] = useState("stats");
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "", price: "", stock: "", category: "Remeras", description: "", image: ""
  });

  async function loadProducts() {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data.products || []);
  }

  useEffect(() => { if (authed) loadProducts(); }, [authed]);

  const login = () => {
    if (password === (process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "")) {
      setAuthed(true);
    } else {
      // En client no tenemos acceso directo al server env, usamos API:
      if (password) {
        fetch("/api/admin/auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password })
        }).then(r => r.json()).then(d => {
          if (d.ok) setAuthed(true);
          else alert("❌ Contraseña incorrecta");
        });
      } else {
        alert("Ingresa la contraseña");
      }
    }
  };

  const logout = () => { setAuthed(false); setPassword(""); };

  const addProduct = async () => {
    if (!form.name || !form.price) return alert("Completa al menos nombre y precio");
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        price: parseInt(form.price),
        stock: parseInt(form.stock || "0")
      })
    });
    const data = await res.json();
    if (data.ok) {
      setForm({ name: "", price: "", stock: "", category: "Remeras", description: "", image: "" });
      await loadProducts();
      setTab("products");
      alert("✅ Producto agregado");
    } else alert("No se pudo agregar");
  };

  const deleteProduct = async (id) => {
    if (!confirm("¿Eliminar producto?")) return;
    const res = await fetch("/api/products?id=" + id, { method: "DELETE" });
    const data = await res.json();
    if (data.ok) {
      await loadProducts();
      alert("✅ Producto eliminado");
    } else alert("No se pudo eliminar");
  };

  const editProduct = async (p) => {
    const name = prompt("Nuevo nombre:", p.name);
    if (name === null) return;
    const price = prompt("Nuevo precio:", p.price);
    if (price === null) return;
    const description = prompt("Nueva descripción:", p.description || "");
    if (description === null) return;
    const stock = prompt("Nuevo stock:", p.stock ?? 0);
    if (stock === null) return;

    const res = await fetch("/api/products", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: p.id,
        name: name || p.name,
        price: parseInt(price) || p.price,
        description: description || p.description,
        stock: parseInt(stock) || p.stock
      })
    });
    const data = await res.json();
    if (data.ok) {
      await loadProducts();
      alert("✅ Producto actualizado");
    } else alert("No se pudo actualizar");
  };

  if (!authed) {
    return (
      <div className="container" style={{ padding: "80px 0", maxWidth: 480 }}>
        <h2 style={{ marginBottom: 12 }}>🔐 Panel de Administración KMZ</h2>
        <p style={{ color: "var(--text-gray)" }}>Gestiona tu tienda de manera profesional</p>
        <div className="card" style={{ padding: 24, marginTop: 24 }}>
          <label>Contraseña</label>
          <input className="input" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Ingresa tu contraseña" />
          <button className="btn" style={{ width: "100%", marginTop: 16 }} onClick={login}>Entrar al Dashboard</button>
        </div>
      </div>
    );
  }

  const totalProducts = products.length;
  const totalValue = products.reduce((sum, p) => sum + (p.price || 0), 0);
  const avgPrice = totalProducts ? Math.round(totalValue / totalProducts) : 0;
  const mostViewed = [...products].sort((a, b) => (b.views || 0) - (a.views || 0))[0];

  return (
    <div className="container" style={{ padding: "40px 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h3>Bienvenido al Dashboard</h3>
        <button className="btn" onClick={logout} style={{ padding: "8px 16px" }}>Cerrar Sesión</button>
      </div>

      <div style={{ display: "flex", gap: 16, borderBottom: "2px solid var(--border)", marginBottom: 24 }}>
        <button className={`tab ${tab === "stats" ? "active" : ""}`} onClick={() => setTab("stats")}>📊 Estadísticas</button>
        <button className={`tab ${tab === "products" ? "active" : ""}`} onClick={() => setTab("products")}>🛍️ Productos</button>
        <button className={`tab ${tab === "add" ? "active" : ""}`} onClick={() => setTab("add")}>➕ Agregar Producto</button>
      </div>

      {tab === "stats" && (
        <div>
          <h3>Estadísticas de la Tienda</h3>
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginTop: 16 }}>
            <div className="card" style={{ padding: 24, textAlign: "center" }}>
              <div style={{ fontSize: "2em", color: "var(--primary)", fontWeight: 700 }}>{totalProducts}</div>
              <div style={{ color: "var(--text-gray)" }}>Total de Productos</div>
            </div>
            <div className="card" style={{ padding: 24, textAlign: "center" }}>
              <div style={{ fontSize: "2em", color: "var(--primary)", fontWeight: 700 }}>${totalValue.toLocaleString("es-AR")}</div>
              <div style={{ color: "var(--text-gray)" }}>Valor Total Inventario</div>
            </div>
            <div className="card" style={{ padding: 24, textAlign: "center" }}>
              <div style={{ fontSize: "2em", color: "var(--primary)", fontWeight: 700 }}>${avgPrice.toLocaleString("es-AR")}</div>
              <div style={{ color: "var(--text-gray)" }}>Precio Promedio</div>
            </div>
            {mostViewed && (
              <div className="card" style={{ padding: 24, textAlign: "center" }}>
                <div style={{ fontSize: "1em", color: "var(--text-gray)" }}>Más visto</div>
                <div style={{ fontSize: "1.1em", fontWeight: 700 }}>{mostViewed.name}</div>
                <div style={{ color: "var(--primary)" }}>{(mostViewed.views || 0)} vistas</div>
              </div>
            )}
          </div>
        </div>
      )}

      {tab === "products" && (
        <div>
          <h3>Gestión de Productos</h3>
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16, marginTop: 16 }}>
            {products.map(p => (
              <div key={p.id} className="card" style={{ padding: 16 }}>
                <img src={p.image} alt={p.name} style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 10 }} />
                <h4 style={{ marginTop: 10 }}>{p.name}</h4>
                <p style={{ color: "var(--primary)", fontWeight: 700 }}>${(p.price || 0).toLocaleString("es-AR")}</p>
                <p style={{ color: "var(--text-gray)" }}>{p.category}</p>
                <p style={{ color: "var(--text-gray)" }}>Stock: {p.stock ?? 0}</p>
                <p style={{ color: "var(--text-gray)" }}>Vistas: {p.views ?? 0}</p>
                <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                  <button className="btn" onClick={() => editProduct(p)} style={{ flex: 1 }}>✏️ Editar</button>
                  <button className="btn" onClick={() => deleteProduct(p.id)} style={{ flex: 1, background: "#ff4444" }}>🗑️ Eliminar</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "add" && (
        <div style={{ maxWidth: 600 }}>
          <h3>Agregar Nuevo Producto</h3>
          <div className="card" style={{ padding: 16, marginTop: 12 }}>
            <label>Nombre</label>
            <input className="input" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Ej: Remera Oversize Negra" />
            <label style={{ marginTop: 10 }}>Precio (sin $)</label>
            <input className="input" type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} placeholder="Ej: 25000" />
            <label style={{ marginTop: 10 }}>Stock</label>
            <input className="input" type="number" value={form.stock} onChange={e => setForm(f => ({ ...f, stock: e.target.value }))} placeholder="Ej: 12" />
            <label style={{ marginTop: 10 }}>Categoría</label>
            <select className="select" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
              <option>Remeras</option>
              <option>Buzos</option>
              <option>Pantalones</option>
              <option>Accesorios</option>
            </select>
            <label style={{ marginTop: 10 }}>Descripción</label>
            <textarea className="textarea" rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Descripción del producto..." />
            <label style={{ marginTop: 10 }}>Imagen (URL)</label>
            <input className="input" value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} placeholder="https://..." />
            <button className="btn" style={{ width: "100%", marginTop: 14 }} onClick={addProduct}>Agregar Producto</button>
          </div>
        </div>
      )}
    </div>
  );
}
