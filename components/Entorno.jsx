import Reveal from "./Reveal";
import { PROYECTO } from "@/data/proyecto";

export default function Entorno() {
  const q = encodeURIComponent(PROYECTO.direccion);
  return (
    <section id="entorno" className="entorno">
      <Reveal className="entorno__texto">
        <p className="eyebrow">El entorno</p>
        <h2>
          Conectividad y <em>calma barrial.</em>
        </h2>
        <p>
          Ubicado en una de las arterias residenciales más tranquilas y con mayor proyección de Lanús Este, su
          posición ofrece el equilibrio justo entre conectividad y vida de barrio.
        </p>
        <ul className="entorno__lista">
          <li>
            <strong>Conectividad fluida</strong>
            Acceso directo a arterias comerciales y múltiples líneas de transporte hacia el centro de Lanús y CABA.
          </li>
          <li>
            <strong>Vida de barrio y servicios</strong>
            A minutos de centros de salud, colegios tradicionales y comercios, rodeado de casas y serenidad cotidiana.
          </li>
        </ul>
        <a className="btn btn--line" href={`https://www.google.com/maps/search/?api=1&query=${q}`} target="_blank" rel="noopener">
          Cómo llegar ↗
        </a>
      </Reveal>
      <Reveal className="entorno__mapa" delay={120}>
        <iframe
          title="Mapa: José Bolaños 1256, Lanús Este"
          src={`https://maps.google.com/maps?q=${q}&z=15&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <img className="entorno__aerea" src="/img/aerea.webp" alt="Vista aérea del edificio" loading="lazy" />
      </Reveal>
    </section>
  );
}
