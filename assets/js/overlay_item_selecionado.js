// Configuração do Worker da biblioteca PDF.js (CDN)
if (typeof pdfjsLib !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
}

document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById('overlay');
  const overlayRestrito = document.getElementById("restritoOverlay");
  const overlayPago = document.getElementById("pagoOverlay");
  const cadastroAviso = document.getElementById("cadastroAviso");

  const fecharAviso = document.getElementById("fecharAviso");
  const fecharPago = document.getElementById("fecharPago");
  const fecharCadastro = document.getElementById("fecharCadastro");
  const acessarPago = document.getElementById("acessarPago");

  const linkForm = "https://forms.com";

  // =========================================================
  // LÓGICA DO READING PREVIEW (PDF.js)
  // =========================================================
  const canvas = document.getElementById('pdf-canvas');
  const rawPdfUrl = 'Livro José Octávio - História da Paraíba (Lutas e Resistência)_removed-censored.pdf';
  const pdfUrl = encodeURI(rawPdfUrl); 
  const MAX_PREVIEW_PAGES = 2;

  let pdfDoc = null;
  let pageNum = 1;
  let pageRendering = false;
  let pageNumPending = null;

  function renderPage(num) {
    if (!pdfDoc || !canvas) return;
    pageRendering = true;

    pdfDoc.getPage(num).then((page) => {
      const ctx = canvas.getContext('2d');
      // Força uma escala adequada
      const viewport = page.getViewport({ scale: 1.0 });

      // Ajusta o tamanho do canvas para corresponder à página do PDF
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: ctx,
        viewport: viewport
      };

      const renderTask = page.render(renderContext);

      renderTask.promise.then(() => {
        pageRendering = false;
        if (pageNumPending !== null) {
          renderPage(pageNumPending);
          pageNumPending = null;
        }
      }).catch(err => {
        console.error("Erro na renderização:", err);
      });
    });

    const pageNumEl = document.getElementById('page-num');
    if (pageNumEl) pageNumEl.textContent = num;
  }

  function queueRenderPage(num) {
    if (pageRendering) {
      pageNumPending = num;
    } else {
      renderPage(num);
    }
  }

  function carregarEExibirPDF() {
    if (!canvas || typeof pdfjsLib === 'undefined') return;

    // Reseta para a página 1 sempre que reabre o modal
    pageNum = 1;

    pdfjsLib.getDocument(pdfUrl).promise.then((pdfDoc_) => {
      pdfDoc = pdfDoc_;
      const pageCountEl = document.getElementById('page-count');
      if (pageCountEl) {
        pageCountEl.textContent = Math.min(pdfDoc.numPages, MAX_PREVIEW_PAGES);
      }
      renderPage(pageNum);
    }).catch((error) => {
      console.error('Erro ao carregar o arquivo PDF:', error);
    });
  }

  // Evento do botão original para abrir o overlay
  document.querySelector('.download-link')?.addEventListener('click', function (e) {
    e.preventDefault();
    if (overlay) {
      overlay.style.display = 'flex';
      // Renderiza o PDF APÓS o overlay ficar visível
      setTimeout(() => {
        carregarEExibirPDF();
      }, 50);
    }
  });

  // Controles de Navegação das Páginas do Preview
  const btnNext = document.getElementById('next-page');
  const btnPrev = document.getElementById('prev-page');

  if (btnNext) {
    btnNext.addEventListener('click', () => {
      if (pageNum >= MAX_PREVIEW_PAGES) {
        if (cadastroAviso) cadastroAviso.style.display = "flex";
        return;
      }
      pageNum++;
      queueRenderPage(pageNum);
    });
  }

  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      if (pageNum <= 1) return;
      pageNum--;
      queueRenderPage(pageNum);
    });
  }

  // =========================================================
  // LÓGICA ORIGINAL DO SEU SISTEMA (MODAIS / RESTRIÇÕES)
  // =========================================================

  function pedirIdade() {
    let idade = prompt("Por favor, informe sua idade:");
    if (idade === null || idade.trim() === "") return null;
    idade = parseInt(idade);
    if (isNaN(idade)) {
      alert("Por favor, insira um número válido.");
      return null;
    }
    return idade;
  }

  document.querySelectorAll(".acessarAgora").forEach(botao => {
    botao.addEventListener("click", function(event) {
      const tipo = this.dataset.restricao;

      switch (tipo) {

        case "referencia": {
          event.preventDefault();
          window.open(this.href, "_blank");
          return;
        }

        case "cadastro": {
          event.preventDefault();
          if (cadastroAviso) cadastroAviso.style.display = "flex";
          return;
        }

        case "idade": {
          const idade = pedirIdade();
          if (idade !== null && idade < 18) {
            event.preventDefault();
            if (overlayRestrito) overlayRestrito.style.display = "flex";
            return;
          }
          return;
        }

        case "pago": {
          event.preventDefault();
          if (overlayPago) overlayPago.style.display = "flex";
          return;
        }

        case "idade-pago": {
          const idade = pedirIdade();
          if (idade !== null && idade < 18) {
            event.preventDefault();
            if (overlayRestrito) overlayRestrito.style.display = "flex";
            return;
          }
          event.preventDefault();
          if (overlayPago) overlayPago.style.display = "flex";
          return;
        }

        default:
          return;
      }
    });
  });

  document.querySelectorAll(".close-overlay").forEach(botao => {
    botao.addEventListener("click", function() {
      const parentOverlay = this.closest("#overlay");
      if (parentOverlay) parentOverlay.style.display = "none";
    });
  });

  if (fecharAviso) {
    fecharAviso.addEventListener("click", () => {
      if (overlayRestrito) overlayRestrito.style.display = "none";
    });
  }

  if (fecharCadastro) {
    fecharCadastro.addEventListener("click", () => {
      if (cadastroAviso) cadastroAviso.style.display = "none";
    });
  }

  if (fecharPago) {
    fecharPago.addEventListener("click", () => {
      if (overlayPago) overlayPago.style.display = "none";
    });
  }

  if (acessarPago) {
    acessarPago.addEventListener("click", () => {
      window.open(linkForm, "_blank");
    });
  }
});