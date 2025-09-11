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