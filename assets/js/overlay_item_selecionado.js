document.querySelector('.download-link').addEventListener('click', function (e) {
	e.preventDefault();
	document.getElementById('overlay').style.display = 'flex';
});

document.addEventListener("DOMContentLoaded", () => {
  const overlayRestrito = document.getElementById("restritoOverlay");
  const overlayPago = document.getElementById("pagoOverlay");

  const fecharAviso = document.getElementById("fecharAviso");
  const fecharPago = document.getElementById("fecharPago");

	const linkForm = "https://forms.com";

  let idade = prompt("Por favor, informe sua idade:");

  function pedirIdade() {
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
      
      /* Aplicar depois para consertar o escopo
      switch (tipo) {
        case "livre":
          return;

        case "referencia":
          event.preventDefault();
          window.open(this.href, "_blank");
          return;

        case "idade":
          const idade = pedirIdade();
          if (idade < 18) {
					event.preventDefault();
          overlayRestrito.style.display = "flex";
          return;
          } else return;

        case "pago":
          event.preventDefault();
          overlayPago.style.display = "flex";
          return;
        
        case "idade-pago":
          event.preventDefault();
          const idade = pedirIdade();
          if (idade < 18) {
          overlayRestrito.style.display = "flex";
          return;
          }
          overlayPago.style.display = "flex";
          return;
      }
      */

      
			if (tipo === "livre") {
				return;
			}

      if (tipo === "referencia") {
        event.preventDefault();
        window.open(this.href, "_blank");
        return;
      }

      if (tipo === "idade") {
        const idade = pedirIdade();
        if (idade < 18) {
					event.preventDefault();
          overlayRestrito.style.display = "flex";
          return;
        } else return;
      }

      if (tipo === "pago") {
        event.preventDefault();
        overlayPago.style.display = "flex";
        return;
      }

      if (tipo === "idade-pago") {
        event.preventDefault();
        const idade = pedirIdade();
        if (idade < 18) {
          overlayRestrito.style.display = "flex";
          return;
        }
        overlayPago.style.display = "flex";
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