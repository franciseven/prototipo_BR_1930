function getDirDepth() {
  const parts = window.location.pathname.split("/").filter(Boolean);
  return Math.max(parts.length - 1, 0);
}

function getRootRel() {
  return "../".repeat(getDirDepth());
}

function pesquisar() {
  const termo = document.getElementById("pesquisaGeral").value.trim();
  if (termo !== "") {
    window.location.href = getRootRel() + "colecoes/busca_principal.html";
  }
}