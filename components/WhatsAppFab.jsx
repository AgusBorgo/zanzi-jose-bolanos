"use client";
import { useEffect, useState } from "react";
import { waLink, waMensajeUnidad } from "@/data/proyecto";
import { useUnidad } from "./UnidadContext";

// Botón flotante: si la persona ya eligió una unidad, el mensaje sale armado con esa unidad.
export default function WhatsAppFab() {
  const { unidad, interes } = useUnidad();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const on = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const u = interes ? unidad : null;
  return (
    <a
      className={`fab ${visible ? "fab--on" : ""}`}
      href={waLink(waMensajeUnidad(u))}
      target="_blank"
      rel="noopener"
      aria-label={u ? `Consultar por WhatsApp sobre ${u.codigo}` : "Consultar por WhatsApp"}
    >
      <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
        <path
          fill="currentColor"
          d="M17.5 14.4c-.3-.1-1.8-.9-2-1s-.5-.1-.7.1-.8 1-1 1.2-.4.2-.7.1a8.2 8.2 0 0 1-4-3.5c-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.8.4 3.5 3.5 0 0 0-1.1 2.6 6 6 0 0 0 1.3 3.2 13.7 13.7 0 0 0 5.3 4.6c2 .8 2.7.9 3.7.7a3.1 3.1 0 0 0 2-1.4 2.5 2.5 0 0 0 .2-1.4c-.1-.1-.3-.2-.6-.3zM12 21.8a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4a9.8 9.8 0 1 1 8.3 4.6zm8.4-18.2A11.8 11.8 0 0 0 1.8 17.9L.1 24l6.3-1.6A11.8 11.8 0 0 0 12 23.8 11.8 11.8 0 0 0 20.4 3.6z"
        />
      </svg>
      {u && <span className="fab__label">Consultar {u.codigo}</span>}
    </a>
  );
}
