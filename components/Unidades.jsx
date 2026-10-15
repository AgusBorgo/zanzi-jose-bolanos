"use client";
import { useMemo, useState } from "react";
import { UNIDADES, FILTROS, formatUSD, waLink, waMensajeUnidad } from "@/data/proyecto";
import { useUnidad } from "./UnidadContext";
import Reveal from "./Reveal";

// Posición de cada unidad en el corte esquemático del edificio (SVG 520 x 560).
const X0 = 70, X1 = 270, X2 = 470;
const PB_W = (X2 - X0) / 3;
const Y = { t3: 60, t2: 170, t1: 280, tpb: 390, suelo: 520 };

const BLOQUES = {
  "3-a": { x: X0, y: Y.t3, w: X1 - X0, h: 110 },
  "duplex-a": { x: X1, y: Y.t3, w: X2 - X1, h: 220 },
  "2-b": { x: X0, y: Y.t2, w: X1 - X0, h: 110 },
  "1-a": { x: X0, y: Y.t1, w: X1 - X0, h: 110 },
  "pb-b": { x: X0, y: Y.tpb, w: PB_W, h: 130 },
  "pb-c": { x: X0 + PB_W, y: Y.tpb, w: PB_W, h: 130 },
  "pb-d": { x: X0 + PB_W * 2, y: Y.tpb, w: PB_W, h: 130 },
};

function Ventanas({ b, tipo }) {
  // Dibujo de líneas dentro de cada bloque, al estilo del boceto a mano.
  const cx = b.x + b.w / 2;
  if (tipo === "pb") {
    return (
      <g className="ed__lines">
        <rect x={cx - 24} y={b.y + 50} width="48" height="62" />
        <line x1={cx} y1={b.y + 50} x2={cx} y2={b.y + 112} />
      </g>
    );
  }
  const rows = b.h > 120 ? [b.y + 32, b.y + 142] : [b.y + 32];
  return (
    <g className="ed__lines">
      {rows.map((y) => (
        <g key={y}>
          <rect x={b.x + 24} y={y} width={b.w - 48} height="44" />
          <line x1={cx} y1={y} x2={cx} y2={y + 44} />
          <line x1={b.x + 14} y1={y + 62} x2={b.x + b.w - 14} y2={y + 62} className="ed__rail" />
          {[...Array(9)].map((_, i) => (
            <line key={i} x1={b.x + 14 + ((b.w - 28) / 8) * i} y1={y + 50} x2={b.x + 14 + ((b.w - 28) / 8) * i} y2={y + 62} className="ed__rail" />
          ))}
        </g>
      ))}
    </g>
  );
}

export default function Unidades() {
  const { unidad, unidadId, setUnidadId, setInteres } = useUnidad();
  const [filtro, setFiltro] = useState("todas");
  const [hover, setHover] = useState(null);

  const visibles = useMemo(
    () => new Set(UNIDADES.filter((u) => filtro === "todas" || u.tags.includes(filtro)).map((u) => u.id)),
    [filtro]
  );

  const elegirFiltro = (f) => {
    setFiltro(f);
    const lista = UNIDADES.filter((u) => f === "todas" || u.tags.includes(f));
    if (lista.length && !lista.some((u) => u.id === unidadId)) setUnidadId(lista[0].id);
  };

  const elegir = (id) => {
    if (!visibles.has(id)) return;
    setUnidadId(id);
    setInteres(true);
  };

  const consultar = () => {
    setInteres(true);
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
  };

  const u = unidad;

  return (
    <section id="unidades" className="unidades">
      <Reveal className="sec-head">
        <p className="eyebrow">Espacios & distribución</p>
        <h2>
          Elegí tu unidad <em>piso por piso.</em>
        </h2>
        <p className="sec-head__sub">Tocá una unidad en el edificio para ver su plano, metros y precio.</p>
      </Reveal>

      <div className="filtros" role="group" aria-label="Filtrar unidades">
        {FILTROS.map((f) => (
          <button key={f.id} className={`chip ${filtro === f.id ? "chip--on" : ""}`} onClick={() => elegirFiltro(f.id)} aria-pressed={filtro === f.id}>
            {f.label}
          </button>
        ))}
      </div>

      <div className="selector">
        <div className="edificio">
          <svg viewBox="0 0 520 560" role="group" aria-label="Corte del edificio con las unidades">
            {/* techo y estructura */}
            <line x1={X0 - 14} y1={Y.t3 - 12} x2={X2 + 14} y2={Y.t3 - 12} className="ed__struct" />
            <rect x={X0} y={Y.t3} width={X2 - X0} height={Y.suelo - Y.t3} className="ed__shell" />
            {/* parasol de madera vertical */}
            {[0, 1, 2, 3].map((i) => (
              <line key={i} x1={X2 + 6 + i * 5} y1={Y.t3 - 8} x2={X2 + 6 + i * 5} y2={Y.tpb} className="ed__wood" />
            ))}
            {/* niveles */}
            {[["3°", Y.t3], ["2°", Y.t2], ["1°", Y.t1], ["PB", Y.tpb]].map(([n, y]) => (
              <g key={n}>
                <text x={X0 - 18} y={y + 60} className="ed__nivel" textAnchor="end">{n}</text>
                <line x1={X0 - 10} y1={y} x2={X0} y2={y} className="ed__struct" />
              </g>
            ))}
            {/* unidad no disponible en 1° */}
            <g className="ed__na">
              <rect x={X1} y={Y.t1} width={X2 - X1} height="110" />
              <text x={(X1 + X2) / 2} y={Y.t1 + 60} textAnchor="middle">No disponible</text>
            </g>

            {UNIDADES.map((un) => {
              const b = BLOQUES[un.id];
              if (!b) return null;
              const activo = un.id === unidadId;
              const vis = visibles.has(un.id);
              const cls = ["ed__u", activo && "is-active", !vis && "is-dim", hover === un.id && "is-hover"].filter(Boolean).join(" ");
              return (
                <g
                  key={un.id}
                  className={cls}
                  role="button"
                  tabIndex={vis ? 0 : -1}
                  aria-label={`${un.codigo}: ${un.titulo}, ${un.m2} metros cuadrados, ${formatUSD(un.precio)}`}
                  aria-pressed={activo}
                  onClick={() => elegir(un.id)}
                  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), elegir(un.id))}
                  onMouseEnter={() => setHover(un.id)}
                  onMouseLeave={() => setHover(null)}
                >
                  <rect x={b.x} y={b.y} width={b.w} height={b.h} className="ed__fill" />
                  <Ventanas b={b} tipo={un.id.startsWith("pb") ? "pb" : "alto"} />
                  <text x={b.x + 10} y={b.y + 22} className="ed__code">{un.codigo}</text>
                  {un.tags.includes("cochera") && (
                    <text x={b.x + b.w - 8} y={b.y + 20} textAnchor="end" className="ed__mini">garage</text>
                  )}
                </g>
              );
            })}
            <line x1="20" y1={Y.suelo} x2="500" y2={Y.suelo} className="ed__suelo" />
          </svg>
          <p className="edificio__nota">Esquema ilustrativo · 1 dúplex ya vendido</p>
        </div>

        {u && (
          <article className="ficha" key={u.id} aria-live="polite">
            <div className="ficha__top">
              <span className="ficha__codigo">{u.codigo}</span>
              <span className="ficha__piso">{u.piso}</span>
            </div>
            <h3 className="ficha__titulo">{u.titulo}</h3>
            <p className="ficha__resumen">{u.resumen}</p>

            <div className="ficha__plano">
              <a href={u.plano} target="_blank" rel="noopener" aria-label="Ver plano en grande">
                <img src={u.plano} alt={`Plano de la unidad ${u.codigo}`} />
              </a>
            </div>

            <dl className="ficha__datos">
              <div><dt>Superficie</dt><dd>{u.m2} m²</dd></div>
              <div><dt>Ambientes</dt><dd>{u.ambientes}</dd></div>
              <div><dt>Precio</dt><dd>{formatUSD(u.precio)}</dd></div>
              <div><dt>Por m²</dt><dd>{formatUSD(Math.round(u.precio / u.m2))}</dd></div>
            </dl>

            <ul className="ficha__lista">
              {u.destacados.map((d) => <li key={d}>{d}</li>)}
            </ul>
            <p className="ficha__fin">Anticipo y cuotas · Acepta mascotas</p>

            <div className="ficha__cta">
              <a className="btn btn--ink" href={u.link} target="_blank" rel="noopener">
                Ver publicación completa ↗
              </a>
              <a className="btn btn--wa" href={waLink(waMensajeUnidad(u))} target="_blank" rel="noopener">
                Consultar por WhatsApp
              </a>
              <button className="btn btn--line" onClick={consultar}>Dejar mis datos</button>
            </div>
          </article>
        )}
      </div>

      <div className="tira" role="list" aria-label="Todas las unidades">
        {UNIDADES.map((un) => (
          <button
            key={un.id}
            role="listitem"
            className={`tira__item ${un.id === unidadId ? "is-active" : ""} ${visibles.has(un.id) ? "" : "is-dim"}`}
            onClick={() => elegir(un.id)}
          >
            <strong>{un.codigo}</strong>
            <span>{un.tipo} · {un.m2} m²</span>
            <em>{formatUSD(un.precio)}</em>
          </button>
        ))}
      </div>
    </section>
  );
}
