// Todos los datos del proyecto en un solo lugar.
// Para cambiar un precio, un link o marcar una unidad como vendida, se edita acá.

export const PROYECTO = {
  nombre: "José Bolaños 1256",
  barrio: "Lanús Este",
  direccion: "José Bolaños 1256, Lanús Este, Buenos Aires",
  whatsapp: "5491130967040", // formato internacional para wa.me (54 9 11 3096-7040)
  whatsappVisible: "11 3096-7040",
  email: "constructorazanzi@gmail.com",
  arquitecto: "Arq. Lucas Ilacqua",
};

export const UNIDADES = [
  {
    id: "pb-a-duplex",
    codigo: "PB A",
    piso: "Planta baja y 1° piso",
    titulo: "Dúplex 3 ambientes con patio y cochera",
    tipo: "Dúplex",
    ambientes: 3,
    vendido: true, // ← unidad vendida: se muestra marcada en el edificio, sin precio ni consultas
    tags: ["patio", "cochera", "3amb"],
    plano: "/img/plano-duplex-pb.webp",
    resumen: "El equilibrio perfecto entre la independencia de una casa y la seguridad de un departamento.",
    destacados: [
      "Garage propio",
      "Patio propio",
      "Living, cocina y toilette en planta baja",
      "Dos dormitorios y baño completo arriba",
    ],
  },
  {
    id: "pb-b",
    codigo: "PB B",
    piso: "Planta baja",
    titulo: "2 ambientes con garage y patio",
    tipo: "Garage + patio",
    ambientes: 2,
    m2: 62,
    precio: 83000,
    tags: ["patio", "cochera"],
    plano: "/img/plano-pb-garage.webp",
    link: "https://www.zanzipropiedades.com.ar/propiedad/735465",
    resumen: "Comodidad, funcionalidad y espacio al aire libre, todo en una sola planta.",
    destacados: [
      "Garage propio con acceso directo",
      "Patio con espacio para parrilla y lavadero",
      "Dormitorio con ventanal al patio",
      "Estar-comedor integrado a la cocina",
    ],
  },
  {
    id: "pb-c",
    codigo: "PB C",
    piso: "Planta baja",
    titulo: "2 ambientes con doble patio privado",
    tipo: "Doble patio",
    ambientes: 2,
    m2: 64,
    precio: 72000,
    tags: ["patio"],
    plano: "/img/plano-pb-patios.webp",
    link: "https://www.zanzipropiedades.com.ar/propiedad/735471",
    resumen: "Luz natural, tranquilidad y un diseño pensado para vivir en contacto con el exterior.",
    destacados: [
      "Dos patios propios",
      "Patio al contrafrente con lugar para parrilla",
      "Segundo patio con acceso desde el dormitorio",
      "Estar-comedor integrado a la cocina",
    ],
  },
  {
    id: "pb-d",
    codigo: "PB D",
    piso: "Planta baja",
    titulo: "2 ambientes con doble patio privado",
    tipo: "Doble patio",
    ambientes: 2,
    m2: 68,
    precio: 75000,
    tags: ["patio"],
    plano: "/img/plano-pb-patios.webp",
    link: "https://www.zanzipropiedades.com.ar/propiedad/735480",
    resumen: "La unidad más amplia de planta baja, con dos patios propios.",
    destacados: [
      "68 m² y dos patios propios",
      "Patio al contrafrente con parrilla y lavadero",
      "Patio interno desde el dormitorio",
      "Estar-comedor integrado a la cocina",
    ],
  },
  {
    id: "1-a",
    codigo: "1° A",
    piso: "Primer piso",
    titulo: "2 ambientes con balcón",
    tipo: "Balcón",
    ambientes: 2,
    m2: 47,
    precio: 70000,
    tags: ["balcon"],
    plano: "/img/plano-2amb-balcon.webp",
    link: "https://www.zanzipropiedades.com.ar/propiedad/735492",
    resumen: "Amplitud, confort y vistas abiertas en un espacio moderno y dinámico.",
    destacados: [
      "Estar-comedor luminoso con salida al balcón",
      "Cocina en L semi-integrada",
      "Dormitorio con placard",
      "Baño completo",
    ],
  },
  {
    id: "2-b",
    codigo: "2° B",
    piso: "Segundo piso",
    titulo: "2 ambientes luminoso con balcón",
    tipo: "Balcón",
    ambientes: 2,
    m2: 47,
    precio: 64000,
    tags: ["balcon"],
    plano: "/img/plano-2amb-balcon.webp",
    link: "https://www.zanzipropiedades.com.ar/propiedad/735542",
    resumen: "Luminoso y en altura, con balcón y lugar para el lavarropas.",
    destacados: [
      "Recibidor que separa la zona social",
      "Balcón con espacio para lavarropas",
      "Cocina en L semi-integrada",
      "Dormitorio con placard",
    ],
  },
  {
    id: "duplex-a",
    codigo: "Dúplex A",
    piso: "2° y 3° piso",
    titulo: "Dúplex 3 ambientes con balcón",
    tipo: "Dúplex",
    ambientes: 3,
    m2: 84,
    precio: 93000,
    tags: ["balcon", "3amb"],
    plano: "/img/plano-duplex.webp",
    link: "https://www.zanzipropiedades.com.ar/propiedad/735506",
    resumen: "Dos niveles: la vida social abajo, el descanso arriba.",
    destacados: [
      "Dos dormitorios con placard",
      "Toilette de recepción + baño completo",
      "Cocina separada con barra desayunadora",
      "Living-comedor con salida al balcón",
    ],
  },
  {
    id: "3-a",
    codigo: "3° A",
    piso: "Tercer piso",
    titulo: "2 ambientes en tercer piso con balcón",
    tipo: "Balcón",
    ambientes: 2,
    m2: 47,
    precio: 58000,
    tags: ["balcon"],
    plano: "/img/plano-2amb-balcon.webp",
    link: "https://www.zanzipropiedades.com.ar/propiedad/735568",
    resumen: "En lo más alto del edificio, con balcón y sector de lavadero.",
    destacados: [
      "Living-comedor con puerta ventana al balcón",
      "Balcón con sector de lavadero",
      "Cocina en L semi-integrada",
      "Dormitorio con placard",
    ],
  },
];

export const FILTROS = [
  { id: "todas", label: "Todas" },
  { id: "patio", label: "Con patio" },
  { id: "balcon", label: "Con balcón" },
  { id: "cochera", label: "Con cochera" },
  { id: "3amb", label: "3 ambientes" },
];

export const GALERIA = [
  { src: "/img/balcones.webp", titulo: "Frente", texto: "Balcones con vidrio, madera y luz cálida." },
  { src: "/img/escalera.webp", titulo: "Ingreso", texto: "Materiales nobles desde el primer paso." },
  { src: "/img/cocina.webp", titulo: "Cocina", texto: "Mesadas oscuras, alacenas y luz bajo mesada." },
  { src: "/img/comedor.webp", titulo: "Estar", texto: "Espacios integrados para el día a día." },
  { src: "/img/patio.webp", titulo: "Patio", texto: "Parrilla, verde y aire libre propio." },
  { src: "/img/dormitorio.webp", titulo: "Dormitorio", texto: "Un refugio cálido para descansar." },
  { src: "/img/suite.webp", titulo: "Descanso", texto: "Luz indirecta y terminaciones de vanguardia." },
  { src: "/img/garage.webp", titulo: "Garage", texto: "Cochera propia con acceso directo." },
];

export const DISPONIBLES = UNIDADES.filter((u) => !u.vendido);

export const formatUSD = (n) => "USD " + n.toLocaleString("es-AR");

export const waLink = (texto) =>
  `https://wa.me/${PROYECTO.whatsapp}?text=${encodeURIComponent(texto)}`;

export const waMensajeUnidad = (u) =>
  u && !u.vendido
    ? `¡Hola! Me interesa la unidad ${u.codigo} (${u.titulo}) de José Bolaños 1256. ¿Me pasan más info? ${u.link}`
    : "¡Hola! Quiero recibir información sobre el proyecto José Bolaños 1256 en Lanús Este.";
