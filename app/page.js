import { UnidadProvider } from "@/components/UnidadContext";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Manifiesto from "@/components/Manifiesto";
import Unidades from "@/components/Unidades";
import Galeria from "@/components/Galeria";
import Entorno from "@/components/Entorno";
import Contacto from "@/components/Contacto";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";

export default function Home() {
  return (
    <UnidadProvider>
      <Nav />
      <main>
        <Hero />
        <Manifiesto />
        <Unidades />
        <Galeria />
        <Entorno />
        <Contacto />
      </main>
      <Footer />
      <WhatsAppFab />
    </UnidadProvider>
  );
}
