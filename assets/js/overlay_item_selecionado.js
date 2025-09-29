document.querySelector('.download-link').addEventListener('click', function (e) {
	e.preventDefault();
	document.getElementById('overlay').style.display = 'flex';
});

document.addEventListener("DOMContentLoaded", () => {
  const overlayRestrito = document.getElementById("restritoOverlay");
  const overlayPago = document.getElementById("pagoOverlay");
  const cadastroAviso = document.getElementById("cadastroAviso");

  const fecharAviso = document.getElementById("fecharAviso");
  const fecharPago = document.getElementById("fecharPago");
  const fecharCadastro = document.getElementById("fecharCadastro");

	const linkForm = "https://forms.com";

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
        case "livre":
          return;

        case "referencia": {
          event.preventDefault();
          window.open(this.href, "_blank");
          return;
        }

        case "cadastro": {
          event.preventDefault();
          cadastroAviso.style.display = "flex";
          return;
        }

        case "idade": {
          const idade = pedirIdade();
          if (idade !== null && idade < 18) {
            event.preventDefault();
            overlayRestrito.style.display = "flex";
            return;
          }
          return;
        }

        case "pago": {
          event.preventDefault();
          overlayPago.style.display = "flex";
          return;
        }

        case "idade-pago": {
          const idade = pedirIdade();
          if (idade !== null && idade < 18) {
            event.preventDefault();
            overlayRestrito.style.display = "flex";
            return;
          }
          event.preventDefault();
          overlayPago.style.display = "flex";
          return;
        }

        default:
          return;
      }
    });
  });

  document.querySelectorAll(".close-overlay").forEach(botao => {
    botao.addEventListener("click", function() {
      const overlay = this.closest("#overlay");
      if (overlay) overlay.style.display = "none";
    });
  });

  if (fecharAviso) {
    fecharAviso.addEventListener("click", () => {
      overlayRestrito.style.display = "none";
    });
  }

  if (fecharCadastro) {
    fecharCadastro.addEventListener("click", () => {
      cadastroAviso.style.display = "none";
    })
  };

  if (fecharPago) {
    fecharPago.addEventListener("click", () => {
      overlayPago.style.display = "none";
    });
  }

  if (acessarPago) {
    acessarPago.addEventListener("click", () => {
      window.open(linkForm, "_blank");
    });
  }
});