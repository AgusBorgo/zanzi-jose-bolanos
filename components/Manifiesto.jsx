"use client";
import useScrollProgress from "./useScrollProgress";
import Reveal from "./Reveal";
import { DISPONIBLES } from "@/data/proyecto";

const TEXTO =
  "Un proyecto pensado para la exclusividad y el encuentro, donde cada detalle evoca cercanía y diseño residencial de vanguardia. Viví la calidez de un hogar único en Lanús.";

// Las palabras se van "encendiendo" a medida que se scrollea.
export default function Manifiesto() {
  const [ref, p] = useScrollProgress();
  const palabras = TEXTO.split(" ");
  const activas = Math.round(p * 1.25 * palabras.length);

  return (
    <section className="manifiesto" ref={ref}>
      <div className="manifiesto__sticky">
        <p className="manifiesto__text">
          {palabras.map((w, i) => (
            <span key={i} className={i < activas ? "on" : ""}>
              {w}{" "}
            </span>
          ))}
        </p>
        <div className="datos">
          {[
            [String(DISPONIBLES.length), "unidades disponibles"],
            ["47–84", "m² por unidad"],
            ["2 y 3", "ambientes"],
            ["USD", "anticipo + cuotas"],
          ].map(([n, t], i) => (
            <Reveal key={t} className="dato" delay={i * 90}>
              <strong>{n}</strong>
              <span>{t}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
