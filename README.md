# Landing · José Bolaños 1256 — Zanzi Constructora

Landing page del proyecto José Bolaños 1256 (Lanús Este), hecha con **Next.js (Node)** y lista para subir a **Vercel**.

## Qué tiene

- **Hero "Del trazo a tu hogar"**: arranca con el boceto a mano del edificio y, al scrollear, el render se revela desde el centro.
- **Manifiesto**: el texto del brochure se va "encendiendo" palabra por palabra con el scroll.
- **Selector de unidades piso por piso**: un corte del edificio donde se toca cada unidad y aparece su ficha (plano animado, m², precio, USD/m², destacados), con filtros (patio, balcón, cochera, 3 ambientes).
  Cada ficha tiene: **Ver publicación completa** (link a la publicación), **Consultar por WhatsApp** (mensaje ya armado con esa unidad) y **Dejar mis datos** (lleva al formulario con la unidad preseleccionada).
- **Galería horizontal**: en compu avanza de costado mientras se scrollea; en celular se desliza con el dedo. Tocando una foto se agranda.
- **Ubicación** con mapa y vista aérea.
- **Formulario** que manda la consulta por mail a constructorazanzi@gmail.com.
- **Botón flotante de WhatsApp** que cambia el mensaje según la unidad que se eligió.

## Cambiar datos (precios, links, unidades vendidas)

Todo está en **`data/proyecto.js`**. Por ejemplo, para cambiar un precio se edita el campo `precio` de esa unidad.
Para sacar una unidad vendida, se borra su bloque de `UNIDADES` (y en el edificio pasa a verse como "No disponible" si se agrega a mano en `components/Unidades.jsx`).

## Correr en tu compu

```bash
npm install
npm run dev
```

Y abrir http://localhost:3000

## Subir a Vercel

1. Subí esta carpeta a un repo de GitHub (sin `node_modules` ni `.next`, el `.gitignore` ya los excluye).
2. En vercel.com → **Add New → Project** → elegí el repo. Vercel detecta Next.js solo; no hay que tocar nada del build.
3. Antes de deployar (o después, en **Settings → Environment Variables**), cargá estas 3 variables:

| Variable | Valor |
|---|---|
| `GMAIL_USER` | `constructorazanzi@gmail.com` |
| `GMAIL_APP_PASSWORD` | la contraseña de aplicación (ver abajo) |
| `CONTACT_TO` | `constructorazanzi@gmail.com` |

4. **Deploy**. Si cargaste las variables después, hacé **Redeploy** para que las tome.

## Contraseña de aplicación de Gmail (para el formulario)

El formulario envía los mails desde la cuenta de Gmail de la constructora. Google no deja usar la contraseña normal, hay que crear una "contraseña de aplicación":

1. Entrá a la cuenta constructorazanzi@gmail.com → **Gestionar tu cuenta de Google → Seguridad**.
2. Activá la **Verificación en 2 pasos** (es obligatoria para lo siguiente).
3. Buscá **"Contraseñas de aplicaciones"** (myaccount.google.com/apppasswords), creá una con el nombre "Landing" y copiá el código de 16 letras.
4. Ese código va en `GMAIL_APP_PASSWORD`.

Para probarlo en tu compu, copiá `.env.example` como `.env.local` y completalo.

Si las variables no están cargadas, la página funciona igual, pero el formulario muestra un aviso y ofrece escribir por WhatsApp.
