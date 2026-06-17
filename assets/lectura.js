// ============================================================
// ARCHIVO DE SEÑAL — render de lectura individual
// Lee entradas.json, busca la entrada por ?id=, la pinta.
// ============================================================

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function formatearFecha(iso) {
  const meses = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
  ];
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} de ${meses[m - 1]} de ${y}`;
}

function renderBloque(bloque) {
  switch (bloque.tipo) {
    case "parrafo":
      return `<p>${escapeHtml(bloque.texto)}</p>`;
    case "subtitulo":
      return `<h2>${escapeHtml(bloque.texto)}</h2>`;
    case "cita":
      return `<blockquote>${escapeHtml(bloque.texto)}</blockquote>`;
    default:
      return "";
  }
}

async function init() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const main = document.getElementById("reader-root");

  try {
    const res = await fetch("entradas.json");
    if (!res.ok) throw new Error("No se pudo cargar entradas.json");
    const data = await res.json();
    const entrada = data.entradas.find(e => e.id === id);

    if (!entrada) {
      main.innerHTML = `
        <div class="reader-header">
          <a class="back-link" href="index.html">&larr; volver al archivo</a>
          <p>No se encontró esa pieza. Puede que el enlace esté incompleto o la entrada aún no exista.</p>
        </div>`;
      document.title = "No encontrado — " + data.sitio.titulo;
      return;
    }

    document.title = `${entrada.titulo} — ${data.sitio.titulo}`;

    const tagsHtml = (entrada.tags || [])
      .map(t => `<span class="tag">${escapeHtml(t)}</span>`)
      .join("");

    main.innerHTML = `
      <div class="reader-header">
        <a class="back-link" href="index.html">&larr; volver al archivo</a>
        <div class="reader-meta">
          <span class="piece">#${escapeHtml(entrada.pieza)}</span>
          <span class="dot">·</span>
          <span class="cat">${escapeHtml(entrada.categoria)}</span>
          <span class="dot">·</span>
          <span>${formatearFecha(entrada.fecha)}</span>
        </div>
        <h1 class="reader-title">${escapeHtml(entrada.titulo)}</h1>
        ${entrada.subtitulo ? `<p class="reader-subtitle">${escapeHtml(entrada.subtitulo)}</p>` : ""}
      </div>
      <article class="reader-body">
        ${entrada.cuerpo.map(renderBloque).join("\n")}
        <div class="reader-tags">${tagsHtml}</div>
      </article>
    `;
  } catch (err) {
    main.innerHTML = `<div class="reader-header"><p>No se pudo cargar el contenido. Si estás abriendo este archivo directamente (file://), sírvelo con un servidor local — revisa el README.</p></div>`;
    console.error(err);
  }
}

init();
