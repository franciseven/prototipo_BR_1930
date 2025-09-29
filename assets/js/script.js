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
    alert("Ação bloqueada!");
  }
});

/* Funções para impedir o botão direito, exceto em elementos já presentes nas telas

// Função que determina se o elemento é válido para exibir menu
function isElementoValido(element) {
  // Aqui consideramos como válidos: imagens, links, textos (p, h1-h6, span), e outros elementos que você quiser
  const elementosValidos = ['IMG', 'A', 'P', 'SPAN', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'BUTTON', 'DIV'];
  return elementosValidos.includes(element.tagName);
}

// Evento global de clique direito
document.addEventListener('contextmenu', e => {
  if (!isElementoValido(e.target)) {
    // Bloqueia clique direito em áreas vazias
    e.preventDefault();
  }
});

*/