# Archivo de Señal — sitio del proyecto

Este es un sitio web estático: solo HTML, CSS y JavaScript. No tiene PHP,
no tiene base de datos, no necesita servidor propio ni dominio pagado.
Puede alojarse gratis y queda navegable para cualquiera que tenga el link,
sin estar indexado en buscadores si así lo prefieres.

## Estructura de archivos

```
sitio/
├── index.html          → página principal (el archivo/índice)
├── lectura.html         → plantilla de lectura (se usa para TODAS las entradas)
├── entradas.json         ← ESTE es el único archivo que editas para subir contenido
└── assets/
    ├── styles.css       → diseño visual (no lo toques si no quieres cambiar el look)
    ├── index.js         → lógica del índice
    └── lectura.js        → lógica de la página de lectura
```

## Cómo agregar una pieza nueva

Abre `entradas.json` con cualquier editor de texto (incluso el Bloc de notas
o el editor de texto de tu computadora) y agrega un bloque nuevo dentro de
la lista `"entradas"`. Cópialo del ejemplo que ya existe y cambia los datos.

Estructura mínima de una entrada:

```json
{
  "id": "un-identificador-unico-sin-espacios",
  "pieza": "02",
  "titulo": "Título de la pieza",
  "subtitulo": "Subtítulo o bajada (opcional, puedes borrar esta línea)",
  "fecha": "2026-07-01",
  "categoria": "Ensayo",
  "extracto": "Resumen de 1-2 líneas que aparece en el índice.",
  "tags": ["tag1", "tag2", "tag3"],
  "cuerpo": [
    { "tipo": "parrafo", "texto": "Primer párrafo del texto." },
    { "tipo": "subtitulo", "texto": "Un subtítulo dentro del texto" },
    { "tipo": "parrafo", "texto": "Otro párrafo." },
    { "tipo": "cita", "texto": "Una frase destacada o cita textual." }
  ]
}
```

Reglas importantes:
- El `id` debe ser único y sin espacios ni acentos (usa guiones: `mi-articulo-nuevo`).
- No olvides la coma `,` al final de cada entrada si agregas otra después.
- El `cuerpo` es una lista de bloques. Cada bloque es un párrafo, un subtítulo
  o una cita — agrega tantos como necesites, en el orden en que deben aparecer.
- Si tu texto tiene comillas dentro, escríbelas así: `\"como esto\"`.

Puedes validar que el JSON quedó bien escrito pegándolo en
[jsonlint.com](https://jsonlint.com) antes de subir el archivo — te dice si
falta una coma o una llave.

## Cómo alojarlo gratis (sin dominio propio)

### Opción recomendada: GitHub Pages
1. Crea una cuenta gratis en [github.com](https://github.com) si no tienes una.
2. Crea un repositorio nuevo (botón "New repository"), público, con cualquier nombre (ej. `archivo-de-senal`).
3. Sube todos los archivos de esta carpeta (`index.html`, `lectura.html`, `entradas.json`, la carpeta `assets/`) arrastrándolos a la página del repositorio.
4. Ve a Settings → Pages, en "Branch" elige `main` y guarda.
5. En unos minutos tu sitio queda disponible en:
   `https://tu-usuario.github.io/archivo-de-senal/`

Esa URL es la que pones en el link de bio. No necesitas pagar nada, no
necesitas dominio, y nadie llega ahí a menos que tenga el link directo —
no aparece en buscadores a menos que Google lo rastree por sí mismo
(puedes pedir que no se indexe agregando un archivo `robots.txt`, te lo
dejo abajo por si lo necesitas).

### Alternativas igual de válidas
- **Netlify** (netlify.com): arrastras la carpeta entera a su panel y te da una URL al instante.
- **Vercel** (vercel.com): similar a Netlify, conecta con GitHub o subes la carpeta directo.

Cualquiera de las tres es gratuita para este uso y no expira mientras
sigas usando la cuenta.

## Si quieres que NO aparezca en buscadores

Crea un archivo llamado `robots.txt` en la misma carpeta raíz con este contenido:

```
User-agent: *
Disallow: /
```

Esto le pide a los buscadores que no indexen el sitio. No es una garantía
absoluta de privacidad (alguien con el link siempre puede entrar), pero
evita que aparezca en resultados de búsqueda.

## Probarlo en tu computadora antes de subirlo

Si abres `index.html` haciendo doble clic, es posible que el navegador
bloquee la carga de `entradas.json` por seguridad (esto es normal en
archivos locales). Para probarlo bien en tu computadora:

- Si tienes Python instalado: abre una terminal en esta carpeta y corre
  `python3 -m http.server`, luego visita `http://localhost:8000` en tu navegador.
- O simplemente sube los archivos a GitHub Pages / Netlify directamente:
  ahí no tendrás ese problema, porque ya es un servidor real (aunque gratuito).
