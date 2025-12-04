function getDirDepth() {
  const parts = window.location.pathname.split("/").filter(Boolean);
  return Math.max(parts.length - 1, 0);
}

function getRootRel() {
  return "../".repeat(getDirDepth());
}

function getAssetsPath() {
  return getRootRel() + "assets/";
}

function normalizeRelative(p) {
  return p.replace(/^(\.\/|(\.\.\/)+)/g, "");
}

function isExternal(url) {
  return /^(https?:|mailto:|tel:|data:|#|javascript:)/i.test(url);
}

function fixPaths(container) {
  const rootRel = getRootRel();

  container.querySelectorAll("img[src]").forEach(img => {
    const src = img.getAttribute("src");
    if (!src || isExternal(src) || src.startsWith("/")) return;
    img.setAttribute("src", rootRel + normalizeRelative(src));
  });

  container.querySelectorAll("a[href]").forEach(a => {
    const href = a.getAttribute("href");
    if (!href || isExternal(href) || href.startsWith("/")) return;
    a.setAttribute("href", rootRel + normalizeRelative(href));
  });

  container.querySelectorAll('link[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || isExternal(href) || href.startsWith('/')) return;
    link.setAttribute('href', rootRel + normalizeRelative(href));
  });
  container.querySelectorAll('script[src]').forEach(s => {
    const src = s.getAttribute('src');
    if (!src || isExternal(src) || src.startsWith('/')) return;
    s.setAttribute('src', rootRel + normalizeRelative(src));
  });
}

function loadHTML(id, file) {
  fetch(getAssetsPath() + file)
    .then(r => { if (!r.ok) throw new Error("HTTP " + r.status); return r.text(); })
    .then(html => {
      const el = document.getElementById(id);
      el.innerHTML = html;
      fixPaths(el);
    })
    .catch(err => console.error("Erro ao carregar " + file, err));
}

window.addEventListener("DOMContentLoaded", () => {
  loadHTML("header", "header.html");
  loadHTML("footer", "footer.html");
});


// --- Seção de bloqueio de download de imagens sem autorização ---

// Função que aplica o bloqueio a uma imagem
function bloquearImagem(img) {
  // Bloqueia clique direito
  img.addEventListener('contextmenu', e => {
    e.preventDefault();
    alert("Salvar imagens sem autorização não é permitido!");
  });

  // Bloqueia arrastar
  img.addEventListener('dragstart', e => e.preventDefault());
}

// Aplica bloqueio às imagens já existentes
document.querySelectorAll('img').forEach(bloquearImagem);

// Observa alterações no DOM para novas imagens
const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    mutation.addedNodes.forEach(node => {
      if (node.tagName === 'IMG') {
        bloquearImagem(node);
      } else if (node.querySelectorAll) {
        node.querySelectorAll('img').forEach(bloquearImagem);
      }
    });
  });
});

// Configuração do observer: observa todo o documento
observer.observe(document.body, { childList: true, subtree: true });

// Bloqueia atalhos de teclado comuns (Ctrl+S, Ctrl+Shift+S, Ctrl+U, Ctrl+Shift+I, PrintScreen)
document.addEventListener('keydown', e => {
  if (
    (e.ctrlKey && (e.key === 's' || e.key === 'S')) ||
    (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 's') ||
    (e.ctrlKey && e.key.toLowerCase() === 'u') ||
    (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'i') ||
    e.key === 'PrintScreen'
  ) {
    e.preventDefault();
    alert("Acesso a comandos bloqueado!");
  }
});

// Evento global de clique direito
document.addEventListener('contextmenu', e => {
    // Bloqueia clique direito em áreas vazias
    e.preventDefault();
    alert("Acesso ao menu de contexto bloqueado!");
});


function aplicarZoomProporcional() {
  const w = screen.width;
  const h = screen.height;

  let scale = 1;

  if (
    (w === 1536 && h === 864) ||
    (w === 1368 && h === 768)
  ) {
    scale = 0.80;
  }

  if (w === 1280 && h === 720) {
    scale = 0.75
  }

  document.documentElement.style.transform = `scale(${scale})`;
  document.documentElement.style.width = (100 / scale) + "%";
  document.documentElement.style.height = (100 / scale) + "%";
}

aplicarZoomProporcional();
window.addEventListener("resize", aplicarZoomProporcional);