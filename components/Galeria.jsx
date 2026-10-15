"use client";
import { useEffect, useRef, useState } from "react";
import { GALERIA } from "@/data/proyecto";
import useScrollProgress from "./useScrollProgress";

// En compu: la galería avanza de costado mientras scrolleás hacia abajo.
// En celular: se desliza con el dedo.
export default function Galeria() {
  const [ref, p] = useScrollProgress();
  const trackRef = useRef(null);
  const [dist, setDist] = useState(0);
  const [abierta, setAbierta] = useState(null);

  useEffect(() => {
    const medir = () => {
      const t = trackRef.current;
      if (!t) return;
      setDist(window.innerWidth > 860 ? Math.max(0, t.scrollWidth - window.innerWidth + 64) : 0);
    };
    medir();
    window.addEventListener("resize", medir);
    return () => window.removeEventListener("resize", medir);
  }, []);

  useEffect(() => {
    if (abierta === null) return;
    const k = (e) => {
      if (e.key === "Escape") setAbierta(null);
      if (e.key === "ArrowRight") setAbierta((i) => (i + 1) % GALERIA.length);
      if (e.key === "ArrowLeft") setAbierta((i) => (i - 1 + GALERIA.length) % GALERIA.length);
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [abierta]);

  return (
    <section id="galeria" className="galeria" ref={ref} style={{ "--dist": `${dist}px` }}>
      <div className="galeria__sticky">
        <div className="galeria__head">
          <p className="eyebrow">Estilo & detalles</p>
          <h2>
            La experiencia <em>de vivir acá.</em>
          </h2>
          <span className="galeria__count">
            {String(Math.min(GALERIA.length, Math.floor(p * GALERIA.length) + 1)).padStart(2, "0")} / {String(GALERIA.length).padStart(2, "0")}
          </span>
        </div>
        <div className="galeria__track" ref={trackRef} style={{ transform: dist ? `translateX(${-p * dist}px)` : undefined }}>
          {GALERIA.map((g, i) => (
            <figure key={g.src} className="galeria__item" onClick={() => setAbierta(i)}>
              <div className="galeria__img">
                <img src={g.src} alt={g.titulo} loading="lazy" />
              </div>
              <figcaption>
                <strong>{g.titulo}</strong> {g.texto}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {abierta !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setAbierta(null)}>
          <img src={GALERIA[abierta].src} alt={GALERIA[abierta].titulo} />
          <p>{GALERIA[abierta].titulo} — {GALERIA[abierta].texto}</p>
          <button className="lightbox__close" aria-label="Cerrar">×</button>
        </div>
      )}
    </section>
  );
}
