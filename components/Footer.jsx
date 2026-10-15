import { PROYECTO } from "@/data/proyecto";

export default function Footer() {
  return (
    <footer className="footer">
      <img className="footer__logo" src="/img/zanzi.png" alt="Zanzi Constructora" />
      <p className="footer__arq">& Arquitecto Lucas Ilacqua</p>
      <div className="footer__info">
        <span>{PROYECTO.direccion}</span>
        <a href={`mailto:${PROYECTO.email}`}>{PROYECTO.email}</a>
        <span>WhatsApp {PROYECTO.whatsappVisible}</span>
      </div>
      <p className="footer__legal">
        Imágenes ilustrativas, sujetas a modificaciones de proyecto. Precios y disponibilidad sujetos a confirmación.
      </p>
    </footer>
  );
}
