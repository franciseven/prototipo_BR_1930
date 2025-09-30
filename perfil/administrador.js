document.addEventListener("DOMContentLoaded", () => {
  let authors = [];

  const addAuthorBtn = document.getElementById('addAuthorBtn');
  const autorInput = document.getElementById('autorInput');
  const authorsList = document.getElementById('authorsList');
  const btn = document.getElementById("submitContentBtn");
  const fileInput = document.getElementById("fileUpload");

  const fileNameDisplay = document.createElement("p");
  fileNameDisplay.style.fontWeight = "bold";
  fileNameDisplay.style.marginTop = "8px";
  fileNameDisplay.style.color = "#444";
  fileInput.parentNode.insertBefore(fileNameDisplay, fileInput.nextSibling);

  fileInput.addEventListener("change", () => {
    if (fileInput.files.length > 0) {
      fileNameDisplay.textContent = `Arquivo selecionado: ${fileInput.files[0].name}`;
    } else {
      fileNameDisplay.textContent = "";
    }
  });

  addAuthorBtn.addEventListener('click', () => {
    const newAuthor = autorInput.value.trim();

    if (!newAuthor) {
      alert("Favor inserir pelo menos um autor ao clicar no botão");
      return;
    }

    if (authors.includes(newAuthor)) {
      alert("Autores com o mesmo nome não são permitidos, envie um novo autor");
      return;
    }

    authors.push(newAuthor);

    const li = document.createElement('li');
    li.textContent = newAuthor;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = '×';
    removeBtn.style.marginLeft = '8px';
    removeBtn.style.color = 'red';
    removeBtn.style.border = 'none';
    removeBtn.style.background = 'transparent';
    removeBtn.style.cursor = 'pointer';
    removeBtn.title = 'Remover autor';

    removeBtn.addEventListener('click', () => {
      authorsList.removeChild(li);
      authors = authors.filter(a => a !== newAuthor);
    });

    li.appendChild(removeBtn);
    authorsList.appendChild(li);

    autorInput.value = '';
  });

  function resetForm() {
    document.getElementById("titulo").value = "";
    authors = [];
    authorsList.innerHTML = "";
    document.querySelectorAll("input[name='keyword']").forEach(cb => cb.checked = false);
    fileInput.value = "";
    fileNameDisplay.textContent = "";
    document.getElementById("annotation").value = "";
    document.getElementById("visibility").value = "restrito";
  }

  btn.addEventListener("click", function (e) {
    e.preventDefault();
    const titulo = document.getElementById("titulo").value.trim();
    const anotacoes = document.getElementById("annotation").value.trim();
    const arquivo = fileInput.files[0];
    const visibilidade = document.getElementById("visibility").options[document.getElementById("visibility").selectedIndex].text;
    const metadadosSelecionados = Array.from(document.querySelectorAll("input[name='keyword']:checked")).map(checkbox => checkbox.value);

    if (!titulo) {
      alert("Por favor, preencha o campo Título.");
      return;
    }
    if (authors.length === 0) {
      alert("Por favor, adicione pelo menos um autor.");
      return;
    }
    if (!arquivo) {
      alert("Por favor, selecione um arquivo para upload.");
      return;
    }
    if (metadadosSelecionados.length === 0) {
      alert("Por favor, selecione pelo menos um metadado.");
      return;
    }

    const dados = {
      titulo,
      autores: authors,
      anotacoes,
      metadados: metadadosSelecionados,
      visibilidade,
      arquivo
    };

    console.log("Dados a enviar:", dados);

    alert(
      `Conteúdo enviado com sucesso!\n\n` +
      `Título: ${titulo}\n` +
      `Autores: ${authors.join(", ")}\n` +
      `Anotações: ${anotacoes ? anotacoes : 'Nenhuma anotação'}\n` +
      `Metadados: ${metadadosSelecionados.join(", ")}\n` +
      `Visibilidade: ${visibilidade}\n` +
      `Arquivo enviado: ${arquivo.name}`
    );

    resetForm();
  });

  document.querySelectorAll(".editBtn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.getElementById("titulo").value = "Como se Combate o Cangaceirismo na Parahyba";
      authors = ["Jornal A Manhã (RJ)"];
      authorsList.innerHTML = "";
      authors.forEach(author => {
        const li = document.createElement("li");
        li.textContent = author;
        const removeBtn = document.createElement("button");
        removeBtn.textContent = '×';
        removeBtn.style.marginLeft = '8px';
        removeBtn.style.color = 'red';
        removeBtn.style.border = 'none';
        removeBtn.style.background = 'transparent';
        removeBtn.style.cursor = 'pointer';
        removeBtn.title = 'Remover autor';
        removeBtn.addEventListener('click', () => {
          authorsList.removeChild(li);
          authors = authors.filter(a => a !== author);
        });
        li.appendChild(removeBtn);
        authorsList.appendChild(li);
      });
      const palavrasChave = ["terriorio", "periodico"];
      document.querySelectorAll("input[name='keyword']").forEach(cb => {
        cb.checked = palavrasChave.includes(cb.value);
      });
      fileNameDisplay.textContent = "Arquivo anexado: capa_territorio_1.jpg";
      document.getElementById("annotation").value = "";
      document.getElementById("visibility").value = "livre";
    });
  });
});

let modalTipo = "";

function abrirModal(tipo) {
  modalTipo = tipo;

  const titulo = document.getElementById("modal_titulo");
  if (tipo === "parcial") titulo.textContent = "Mensagem de Aprovação Parcial";
  if (tipo === "aprovacao") titulo.textContent = "Mensagem de Aprovação Completa";
  if (tipo === "rejeicao") titulo.textContent = "Mensagem de Rejeição";
  if (tipo === "remocao") titulo.textContent = "Mensagem de Remoção";

  document.getElementById("modal_mensagem").value = "";
  document.getElementById("modal_unico").style.display = "flex";
}

function fecharModal() {
  document.getElementById("modal_unico").style.display = "none";
  modalTipo = "";
}

function enviarSolicitacao() {
  const mensagem = document.getElementById("modal_mensagem").value.trim();
  if (!mensagem) {
    alert("Por favor, escreva a observação antes de enviar.");
    return;
  }

  alert("Observação enviada com sucesso!");

  if (modalTipo === "aprovacao") {
    alert("Conteúdo Aprovado e enviado à base de dados!");
  } 
  else if (modalTipo === "rejeicao") {
    alert("Conteúdo Rejeitado e não anexado à base de dados!");
  } else if (modalTipo === "remocao") {
    alert("Conteúdo Removido da base de dados!");
  }

  fecharModal();
}

window.addEventListener("click", function (event) {
  const modal = document.getElementById("modal_unico");
  if (event.target === modal) {
    fecharModal();
  }
});

document.querySelectorAll(".approve_partialBtn").forEach((btn) => {
  btn.addEventListener("click", () => abrirModal("parcial"));
});

document.querySelectorAll(".approveBtn").forEach((btn) => {
  btn.addEventListener("click", () => abrirModal("aprovacao"));
});

document.querySelectorAll(".rejectBtn").forEach((btn) => {
  btn.addEventListener("click", () => abrirModal("rejeicao"));
});

document.querySelectorAll(".deleteBtn").forEach((btn) => {
  btn.addEventListener("click", () => abrirModal("remocao"));
});

document.querySelectorAll(".viewBtn").forEach((btn) => {
  btn.addEventListener("click", () => {
    alert("Visualizando o conteúdo selecionado!");
  });
});

document.querySelectorAll(".downloadBtn").forEach((btn) => {
  btn.addEventListener("click", () => {
    alert("Baixando o conteúdo selecionado!");
  });
});

