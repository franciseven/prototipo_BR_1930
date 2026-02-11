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
    window.location.href = getRootRel() + "colecoes/busca_principal.html?q=" + encodeURIComponent(termo);
  }
}

document.addEventListener("DOMContentLoaded", function() {
  const campoPesquisa = document.getElementById("pesquisaGeral");

  if (campoPesquisa) {
    const urlParams = new URLSearchParams(window.location.search);
    const termoNaUrl = urlParams.get('q');

    if (termoNaUrl) {
      campoPesquisa.value = decodeURIComponent(termoNaUrl);
    }

    campoPesquisa.addEventListener("keydown", function(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        pesquisar();
      }
    });
  }
});