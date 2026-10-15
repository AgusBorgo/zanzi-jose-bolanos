import nodemailer from "nodemailer";
import { UNIDADES, formatUSD } from "@/data/proyecto";

export const runtime = "nodejs";

const limpiar = (v, max = 500) => String(v ?? "").trim().slice(0, max);
const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Datos inválidos." }, { status: 400 });
  }

  // Bots: si completaron el campo oculto, respondemos "ok" sin mandar nada.
  if (body.web) return Response.json({ ok: true });

  const nombre = limpiar(body.nombre, 120);
  const telefono = limpiar(body.telefono, 40);
  const email = limpiar(body.email, 120);
  const mensaje = limpiar(body.mensaje, 2000);
  const unidad = UNIDADES.find((u) => u.id === body.unidad);

  if (!nombre || !telefono) {
    return Response.json({ error: "Completá tu nombre y teléfono." }, { status: 400 });
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "El email no parece válido." }, { status: 400 });
  }

  const { GMAIL_USER, GMAIL_APP_PASSWORD, CONTACT_TO } = process.env;
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    console.error("Faltan GMAIL_USER / GMAIL_APP_PASSWORD en las variables de entorno.");
    return Response.json({ error: "El formulario todavía no está configurado." }, { status: 500 });
  }

  const unidadTxt = unidad ? `${unidad.codigo} · ${unidad.titulo} · ${formatUSD(unidad.precio)}` : "Consulta general";
  const filas = [
    ["Nombre", nombre],
    ["Teléfono", telefono],
    ["Email", email || "—"],
    ["Unidad", unidadTxt],
    ["Mensaje", mensaje || "—"],
  ];
  const tel = telefono.replace(/\D/g, "");

  const html = `
  <div style="font-family:Arial,sans-serif;max-width:560px;color:#1b1a17">
    <h2 style="font-weight:400;margin:0 0 4px">Nueva consulta · José Bolaños 1256</h2>
    <p style="color:#7a7266;margin:0 0 18px">Desde la landing page</p>
    <table style="border-collapse:collapse;width:100%">
      ${filas
        .map(
          ([k, v]) =>
            `<tr><td style="padding:8px 0;color:#7a7266;width:110px;vertical-align:top">${k}</td><td style="padding:8px 0;white-space:pre-wrap">${esc(v)}</td></tr>`
        )
        .join("")}
    </table>
    ${unidad ? `<p><a href="${unidad.link}">Ver publicación de la unidad</a></p>` : ""}
    ${tel ? `<p><a href="https://wa.me/${tel.startsWith("54") ? tel : "549" + tel.replace(/^0/, "")}">Responder por WhatsApp</a></p>` : ""}
  </div>`;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
    });
    await transporter.sendMail({
      from: `"Landing José Bolaños" <${GMAIL_USER}>`,
      to: CONTACT_TO || GMAIL_USER,
      replyTo: email || undefined,
      subject: `Consulta: ${unidad ? unidad.codigo : "general"} — ${nombre}`,
      text: filas.map(([k, v]) => `${k}: ${v}`).join("\n"),
      html,
    });
    return Response.json({ ok: true });
  } catch (err) {
    console.error("Error enviando mail:", err);
    return Response.json({ error: "No pudimos enviar la consulta en este momento." }, { status: 502 });
  }
}
