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
  const unidad = UNIDADES.find((u) => u.id === body.unidad && !u.vendido);

  if (!nombre || !telefono) {
    return Response.json({ error: "Completá tu nombre y teléfono." }, { status: 400 });
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "El email no parece válido." }, { status: 400 });
  }

  // Dos formas de enviar el mail (alcanza con configurar UNA):
  //  - Resend: RESEND_API_KEY (no necesita celular ni verificación en 2 pasos)
  //  - Gmail:  GMAIL_USER + GMAIL_APP_PASSWORD
  const { RESEND_API_KEY, GMAIL_USER, GMAIL_APP_PASSWORD, CONTACT_TO } = process.env;
  const destino = CONTACT_TO || GMAIL_USER;
  if (!RESEND_API_KEY && !(GMAIL_USER && GMAIL_APP_PASSWORD)) {
    console.error("Falta configurar el envío: cargá RESEND_API_KEY (o GMAIL_USER + GMAIL_APP_PASSWORD).");
    return Response.json({ error: "El formulario todavía no está configurado." }, { status: 500 });
  }
  if (!destino) {
    console.error("Falta CONTACT_TO: el mail al que tienen que llegar las consultas.");
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

  const asunto = `Consulta: ${unidad ? unidad.codigo : "general"} — ${nombre}`;
  const texto = filas.map(([k, v]) => `${k}: ${v}`).join("\n");

  try {
    if (RESEND_API_KEY) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          // Sin dominio propio verificado, Resend solo permite este remitente
          // y solo entrega al mail con el que se creó la cuenta de Resend.
          from: process.env.RESEND_FROM || "Landing José Bolaños <onboarding@resend.dev>",
          to: [destino],
          reply_to: email || undefined,
          subject: asunto,
          text: texto,
          html,
        }),
      });
      if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
    } else {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
      });
      await transporter.sendMail({
        from: `"Landing José Bolaños" <${GMAIL_USER}>`,
        to: destino,
        replyTo: email || undefined,
        subject: asunto,
        text: texto,
        html,
      });
    }
    return Response.json({ ok: true });
  } catch (err) {
    console.error("Error enviando mail:", err);
    return Response.json({ error: "No pudimos enviar la consulta en este momento." }, { status: 502 });
  }
}