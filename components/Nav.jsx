"use client";
import { useEffect, useState } from "react";
import { waLink, waMensajeUnidad } from "@/data/proyecto";

export default function Nav() {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className={`nav ${solid ? "nav--solid" : ""}`}>
      <a href="#inicio" className="nav__brand" aria-label="José Bolaños 1256, inicio">
        <img src="/img/jb.png" alt="" width="34" height="34" />
        <span>José Bolaños 1256</span>
      </a>
      <nav className="nav__links" aria-label="Secciones">
        <a href="#unidades">Unidades</a>
        <a href="#galeria">Galería</a>
        <a href="#entorno">Ubicación</a>
        <a href="#contacto">Contacto</a>
      </nav>
      <a className="btn btn--ink btn--sm" href={waLink(waMensajeUnidad(null))} target="_blank" rel="noopener">
        WhatsApp
      </a>
    </header>
  );
}
