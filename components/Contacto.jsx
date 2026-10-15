"use client";
import { useEffect, useState } from "react";
import { DISPONIBLES as UNIDADES, PROYECTO, waLink, waMensajeUnidad, formatUSD } from "@/data/proyecto";
import { useUnidad } from "./UnidadContext";
import Reveal from "./Reveal";

export default function Contacto() {
  const { unidad, interes } = useUnidad();
  const [form, setForm] = useState({ nombre: "", telefono: "", email: "", unidad: "general", mensaje: "", web: "" });
  const [estado, setEstado] = useState("idle"); // idle | enviando | ok | error
  const [error, setError] = useState("");

  // Si la persona eligió una unidad arriba, el formulario ya viene con esa unidad.
  useEffect(() => {
    if (interes && unidad && !unidad.vendido) setForm((f) => ({ ...f, unidad: unidad.id }));
  }, [interes, unidad]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const enviar = async (e) => {
    e.preventDefault();
    setEstado("enviando");
    setError("");
    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "No pudimos enviar la consulta.");
      setEstado("ok");
    } catch (err) {
      setError(err.message);
      setEstado("error");
    }
  };

  const elegida = UNIDADES.find((u) => u.id === form.unidad);

  return (
    <section id="contacto" className="contacto">
      <Reveal className="contacto__intro">
        <p className="eyebrow">Contacto</p>
        <h2>
          Tu próximo hogar <em>empieza con una charla.</em>
        </h2>
        <p>Dejanos tus datos y te contactamos con planos, formas de pago y disponibilidad. O escribinos directo.</p>
        <a className="btn btn--wa" href={waLink(waMensajeUnidad(elegida))} target="_blank" rel="noopener">
          WhatsApp {PROYECTO.whatsappVisible}
        </a>
        <a className="contacto__mail" href={`mailto:${PROYECTO.email}`}>{PROYECTO.email}</a>
      </Reveal>

      <Reveal className="form-wrap" delay={120}>
        {estado === "ok" ? (
          <div className="form-ok">
            <span className="form-ok__check">✓</span>
            <h3>¡Gracias, {form.nombre.split(" ")[0]}!</h3>
            <p>Recibimos tu consulta. Te vamos a contactar a la brevedad.</p>
            <a className="btn btn--wa" href={waLink(waMensajeUnidad(elegida))} target="_blank" rel="noopener">
              ¿Apurado? Escribinos por WhatsApp
            </a>
          </div>
        ) : (
          <form className="form" onSubmit={enviar}>
            <label>
              <span>Nombre y apellido</span>
              <input required value={form.nombre} onChange={set("nombre")} autoComplete="name" />
            </label>
            <div className="form__row">
              <label>
                <span>Teléfono</span>
                <input required type="tel" value={form.telefono} onChange={set("telefono")} autoComplete="tel" />
              </label>
              <label>
                <span>Email</span>
                <input type="email" value={form.email} onChange={set("email")} autoComplete="email" />
              </label>
            </div>
            <label>
              <span>Unidad de interés</span>
              <select value={form.unidad} onChange={set("unidad")}>
                <option value="general">Quiero conocer todas las opciones</option>
                {UNIDADES.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.codigo} · {u.titulo} · {formatUSD(u.precio)}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>Mensaje (opcional)</span>
              <textarea rows="3" value={form.mensaje} onChange={set("mensaje")} placeholder="Ej: me interesa saber el anticipo y las cuotas" />
            </label>
            {/* campo trampa para bots: las personas no lo ven */}
            <input className="hp" tabIndex={-1} autoComplete="off" value={form.web} onChange={set("web")} aria-hidden="true" />
            <button className="btn btn--ink btn--full" disabled={estado === "enviando"}>
              {estado === "enviando" ? "Enviando…" : "Quiero que me contacten"}
            </button>
            {estado === "error" && (
              <p className="form__error">
                {error}{" "}
                <a href={waLink(waMensajeUnidad(elegida))} target="_blank" rel="noopener">Escribinos por WhatsApp</a>.
              </p>
            )}
          </form>
        )}
      </Reveal>
    </section>
  );
}
