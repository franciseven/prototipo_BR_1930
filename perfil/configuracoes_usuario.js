const dataInput = document.getElementById("data-nascimento");

const hoje = new Date().toISOString().split("T")[0];
dataInput.max = hoje;

document.addEventListener('DOMContentLoaded', () => {
  const estadoSelect = document.getElementById('estado');
  const cidadeContainer = document.getElementById('cidade-container');
  const cidadeSelect = document.getElementById('cidade');
  const outraCidadeInput = document.getElementById('outra-cidade');

  const exteriorContainer = document.getElementById('exterior-container');
  const paisSelect = document.getElementById('pais');
  const estadoExteriorContainer = document.getElementById('estado-exterior-container');
  const estadoExteriorSelect = document.getElementById('estado-exterior');
  const cidadeExteriorContainer = document.getElementById('cidade-exterior-container');
  const cidadeExteriorSelect = document.getElementById('cidade-exterior');
  const outraInstituicaoInput = document.getElementById('outra-instituicao');

  const cidadesPorEstado = {
    'Paraiba': ['João Pessoa', 'Campina Grande', 'Patos', 'Sousa', 'Cajazeiras', 'Outra Cidade'],
    'Minas Gerais': ['Belo Horizonte', 'Uberlândia', 'Contagem', 'Juiz de Fora', 'Montes Claros', 'Outra Cidade'],
    'Rio Grande do Sul': ['Porto Alegre', 'Caxias do Sul', 'Pelotas', 'Santa Maria', 'Passo Fundo', 'Outra Cidade']
  };

  const estadosPorPais = {
    'Estados Unidos da América': {
      'Califórnia': ['Los Angeles', 'San Francisco', 'San Diego'],
      'Nova York': ['Nova York', 'Buffalo', 'Rochester'],
      'Texas': ['Houston', 'Dallas', 'Austin']
    },
    'Canadá': {
      'Ontário': ['Toronto', 'Ottawa', 'Hamilton'],
      'Quebec': ['Montreal', 'Quebec City', 'Laval'],
      'Colúmbia Britânica': ['Vancouver', 'Victoria', 'Richmond']
    },
    'Portugal': {
      'Lisboa': ['Lisboa', 'Sintra', 'Cascais'],
      'Porto': ['Porto', 'Vila Nova de Gaia', 'Matosinhos'],
      'Coimbra': ['Coimbra', 'Figueira da Foz', 'Cantanhede']
    }
  };

  document.querySelectorAll("#cadastro-form input, #cadastro-form select").forEach(input => {
    input.dataset.originalValue = input.value;
  });

  estadoSelect.addEventListener('change', () => {
    const estado = estadoSelect.value;

    if (estado === 'Exterior') {
      cidadeContainer.style.display = 'none';
      cidadeSelect.innerHTML = '';
      cidadeSelect.required = false;

      exteriorContainer.style.display = 'block';
      paisSelect.required = true;

      estadoExteriorContainer.style.display = 'none';
      estadoExteriorSelect.innerHTML = '<option value="" disabled selected>Selecione o estado</option>';
      estadoExteriorSelect.required = false;

      cidadeExteriorContainer.style.display = 'none';
      cidadeExteriorSelect.innerHTML = '<option value="" disabled selected>Selecione a cidade</option>';
      cidadeExteriorSelect.required = false;

      outraCidadeInput.style.display = 'none';
      outraCidadeInput.required = false;

    } else if (cidadesPorEstado[estado]) {
      cidadeContainer.style.display = 'block';
      cidadeSelect.innerHTML = '<option value="" disabled selected>Selecione sua cidade</option>';

      cidadesPorEstado[estado].forEach(cidade => {
        const option = document.createElement('option');
        option.value = cidade;
        option.textContent = cidade;
        cidadeSelect.appendChild(option);
      });

      cidadeSelect.required = true;
      exteriorContainer.style.display = 'none';
      paisSelect.required = false;

      estadoExteriorContainer.style.display = 'none';
      estadoExteriorSelect.innerHTML = '<option value="" disabled selected>Selecione o estado</option>';
      estadoExteriorSelect.required = false;

      cidadeExteriorContainer.style.display = 'none';
      cidadeExteriorSelect.innerHTML = '<option value="" disabled selected>Selecione a cidade</option>';
      cidadeExteriorSelect.required = false;

      outraCidadeInput.style.display = 'none';
      outraCidadeInput.required = false;

    } else {
      cidadeContainer.style.display = 'none';
      cidadeSelect.innerHTML = '';
      cidadeSelect.required = false;

      exteriorContainer.style.display = 'none';
      paisSelect.required = false;

      estadoExteriorContainer.style.display = 'none';
      estadoExteriorSelect.required = false;
      cidadeExteriorContainer.style.display = 'none';
      cidadeExteriorSelect.required = false;

      outraCidadeInput.style.display = 'none';
      outraCidadeInput.required = false;
    }
  });

  paisSelect.addEventListener('change', () => {
    const pais = paisSelect.value;

    estadoExteriorContainer.style.display = 'none';
    estadoExteriorSelect.innerHTML = '<option value="" disabled selected>Selecione o estado</option>';
    estadoExteriorSelect.required = false;

    cidadeExteriorContainer.style.display = 'none';
    cidadeExteriorSelect.innerHTML = '<option value="" disabled selected>Selecione a cidade</option>';
    cidadeExteriorSelect.required = false;

    const outroPais = document.getElementById('outro-pais');
    const outroEstado = document.getElementById('outro-estado');
    const outraCidadeExt = document.getElementById('outra-cidade-exterior');

    if (pais === 'Outro País') {
      outroPais.style.display = 'block';
      outroEstado.style.display = 'block';
      outraCidadeExt.style.display = 'block';

      outroPais.required = true;
      outroEstado.required = true;
      outraCidadeExt.required = true;
    } else {
      outroPais.style.display = 'none';
      outroEstado.style.display = 'none';
      outraCidadeExt.style.display = 'none';

      outroPais.required = false;
      outroEstado.required = false;
      outraCidadeExt.required = false;

      if (estadosPorPais[pais]) {
        Object.keys(estadosPorPais[pais]).forEach(estado => {
          const option = document.createElement('option');
          option.value = estado;
          option.textContent = estado;
          estadoExteriorSelect.appendChild(option);
        });
        estadoExteriorContainer.style.display = 'block';
        estadoExteriorSelect.required = true;
      }
    }
  });

  estadoExteriorSelect.addEventListener('change', () => {
    const pais = paisSelect.value;
    const estado = estadoExteriorSelect.value;

    cidadeExteriorSelect.innerHTML = '<option value="" disabled selected>Selecione a cidade</option>';

    if (estadosPorPais[pais] && estadosPorPais[pais][estado]) {
      estadosPorPais[pais][estado].forEach(cidade => {
        const option = document.createElement('option');
        option.value = cidade;
        option.textContent = cidade;
        cidadeExteriorSelect.appendChild(option);
      });
      cidadeExteriorContainer.style.display = 'block';
      cidadeExteriorSelect.required = true;
    } else {
      cidadeExteriorContainer.style.display = 'none';
      cidadeExteriorSelect.required = false;
    }
  });

  function toggleOutraInput(selectId, inputId, valorParaMostrar) {
    const selectElem = document.getElementById(selectId);
    const inputElem = document.getElementById(inputId);

    selectElem.addEventListener('change', () => {
      if (selectElem.value === valorParaMostrar) {
        inputElem.style.display = 'block';
        inputElem.required = true;
      } else {
        inputElem.style.display = 'none';
        inputElem.required = false;
        inputElem.value = '';
      }
    });
  }

  toggleOutraInput('instituicao-select', 'outra-instituicao', 'Outra');
  toggleOutraInput('cidade', 'outra-cidade', 'Outra Cidade');

  function senhaForte(senha) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\-_#])[A-Za-z\d@$!%*?&\-_#]{8,}$/;
    return regex.test(senha);
  }

  function isAnyFieldChanged(form) {
    const inputs = form.querySelectorAll('input, select, textarea');
    return Array.from(inputs).some(input => {
      const original = input.dataset.originalValue ?? '';
      const current = input.value ?? '';
      return current !== original;
    });
  }

  function showPopup() {
    const popup = document.getElementById("popup-confirmado");
    popup.style.display = "block";
    setTimeout(() => {
      popup.style.display = "none";
    }, 2000);
  }

  document.querySelectorAll("form").forEach((form) => {
    const formTitle = form.closest("section")?.querySelector("h2")?.innerText || "";

    if (formTitle.includes("Foto de Perfil")) {
      const fileInput = form.querySelector("#fileUpload");
      const fileNameDisplay = document.getElementById("fileNameDisplay");

      if (fileInput && fileNameDisplay) {
        fileInput.addEventListener("change", () => {
          if (fileInput.files.length > 0) {
            fileNameDisplay.textContent = `Arquivo selecionado: ${fileInput.files[0].name}`;
          } else {
            fileNameDisplay.textContent = "";
          }
        });
      }
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const formTitle = form.closest("section")?.querySelector("h2")?.innerText || "";

      if (formTitle.includes("Senha")) {
        const senhaAtual = form.querySelector("#senhaAtual");
        const novaSenha = form.querySelector("#novaSenha");
        const confirmarSenha = form.querySelector("#confirmarSenha");
        const senhaAjuda = document.getElementById("senha-ajuda");

        if (!senhaAtual.value || !novaSenha.value || !confirmarSenha.value) {
          alert("Por favor, preencha todos os campos de senha.");
          return;
        }

        if (!senhaForte(novaSenha.value)) {
          senhaAjuda.style.display = 'inline';
          return;
        } else {
          senhaAjuda.style.display = 'none';
        }

        if (novaSenha.value !== confirmarSenha.value) {
          alert("A nova senha e a confirmação devem ser iguais.");
          return;
        }

        showPopup();
        setTimeout(() => form.submit(), 1000);
      } else if (formTitle.includes("Foto de Perfil")) {
        const fileInput = form.querySelector("#fileUpload");

        if (fileInput && fileInput.files.length > 0) {
          showPopup();
          setTimeout(() => form.submit(), 1000);
        } else {
          alert("Nenhum arquivo selecionado.");
        }
      } else if (form.id === "cadastro-form") {
        if (isAnyFieldChanged(form)) {
          showPopup();
          setTimeout(() => {
            const inputs = form.querySelectorAll("input, select, textarea");

            inputs.forEach(input => {
              const original = input.dataset.originalValue ?? "";
              if (input.value !== original) {
                input.value = "";
                input.dataset.originalValue = "";
              }
            });
          }, 1000);
        } else {
          alert("Nenhuma alteração detectada.");
        }
      }
    });
  });
});