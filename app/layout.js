import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "@fontsource-variable/manrope";
import "./globals.css";

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "José Bolaños 1256 · Lanús Este | Zanzi Constructora",
  description:
    "Departamentos de 2 y 3 ambientes en Lanús Este, con patio, balcón o cochera. Anticipo y cuotas en dólares. Un proyecto de Zanzi Constructora.",
  openGraph: {
    title: "José Bolaños 1256 · Lanús Este",
    description: "Departamentos en construcción con patio, balcón o cochera. Anticipo y cuotas.",
    images: ["/img/edificio.webp"],
    locale: "es_AR",
    type: "website",
  },
  icons: { icon: "/img/jb.png" },
};

export const viewport = { themeColor: "#ebe4d8" };

export default function RootLayout({ children }) {
  return (
    <html lang="es-AR">
      <body>{children}</body>
    </html>
  );
}
