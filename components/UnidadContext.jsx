"use client";
import { createContext, useContext, useState } from "react";
import { UNIDADES } from "@/data/proyecto";

// Guarda qué unidad está mirando la persona, para que el botón de WhatsApp
// y el formulario ya sepan por cuál consulta.
const Ctx = createContext(null);

export function UnidadProvider({ children }) {
  const [unidadId, setUnidadId] = useState(UNIDADES[0].id);
  const [interes, setInteres] = useState(false); // true cuando la persona eligió una unidad a propósito
  const unidad = UNIDADES.find((u) => u.id === unidadId) || null;
  return (
    <Ctx.Provider value={{ unidad, unidadId, setUnidadId, interes, setInteres }}>
      {children}
    </Ctx.Provider>
  );
}

export const useUnidad = () => useContext(Ctx);
