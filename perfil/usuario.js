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
    if (newAuthor && !authors.includes(newAuthor)) {
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
    }
  });

  btn.addEventListener("click", function (e) {
    e.preventDefault();

    const titulo = document.getElementById("titulo").value.trim();
    const anotacoes = document.getElementById("annotation").value.trim();
    const arquivo = fileInput.files[0];
    const visibilidade = document.getElementById("visibility").options[document.getElementById("visibility").selectedIndex].text;

    const metadadosSelecionados = Array.from(document.querySelectorAll("input[name='keyword']:checked"))
      .map(checkbox => checkbox.value);

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
      `Conteúdo enviado com sucesso para os administradores para revisão!\n\n` +
      `Observação: O seu conteúdo será enviado para a plataforma apenas após aprovação do administrador!!!\n\n` +
      `Título: ${titulo}\n` +
      `Autores: ${authors.join(", ")}\n` +
      `Anotações: ${anotacoes ? anotacoes : 'Nenhuma anotação'}\n` +
      `Metadados: ${metadadosSelecionados.join(", ")}\n` +
      `Visibilidade: ${visibilidade}\n` +
      `Arquivo enviado: ${arquivo.name}`
    );
  });

  const colecoes = {};

  const colecoesContainer = document.getElementById("colecoesContainer");

  window.criarColecao = function () {
    const nome = document.getElementById("nomeColecao").value.trim();
    if (!nome) {
      alert("Por favor, insira um nome para a coleção.");
      return;
    }

    if (colecoes[nome]) {
      alert("Já existe uma coleção com esse nome.");
      return;
    }

    colecoes[nome] = [];

    const novaColecao = document.createElement("div");
    novaColecao.className = "colecao";
    novaColecao.id = `colecao-${nome}`;

    const h4 = document.createElement("h4");
    h4.textContent = nome;

    const btnExcluirColecao = document.createElement("button");
    btnExcluirColecao.textContent = "×";
    btnExcluirColecao.title = "Remover coleção";
    btnExcluirColecao.style.marginLeft = "8px";
    btnExcluirColecao.style.color = "red";
    btnExcluirColecao.style.border = "none";
    btnExcluirColecao.style.background = "transparent";
    btnExcluirColecao.style.cursor = "pointer";

    btnExcluirColecao.addEventListener("click", () => {
      if (confirm(`Tem certeza que deseja excluir a coleção "${nome}" e todos seus documentos?`)) {
        delete colecoes[nome];
        novaColecao.remove();
      }
    });

    h4.appendChild(btnExcluirColecao);
    novaColecao.appendChild(h4);

    const ul = document.createElement("ul");
    ul.id = `lista-${nome}`;
    novaColecao.appendChild(ul);

    const inputDoc = document.createElement("input");
    inputDoc.type = "text";
    inputDoc.placeholder = "Nome do documento";
    inputDoc.id = `doc-${nome}`;
    novaColecao.appendChild(inputDoc);

    const btnAddDoc = document.createElement("button");
    btnAddDoc.textContent = "Adicionar Documento";
    btnAddDoc.addEventListener("click", () => adicionarDocumento(nome));
    novaColecao.appendChild(btnAddDoc);

    colecoesContainer.appendChild(novaColecao);
    document.getElementById("nomeColecao").value = "";
  };

  window.adicionarDocumento = function (nomeColecao) {
    const input = document.getElementById(`doc-${nomeColecao}`);
    const docNome = input.value.trim();
    if (!docNome) return;

    const lista = document.getElementById(`lista-${nomeColecao}`);

    const item = document.createElement("li");
    item.textContent = docNome;

    const btnExcluirDoc = document.createElement("button");
    btnExcluirDoc.textContent = "×";
    btnExcluirDoc.title = "Remover documento";
    btnExcluirDoc.style.marginLeft = "8px";
    btnExcluirDoc.style.color = "red";
    btnExcluirDoc.style.border = "none";
    btnExcluirDoc.style.background = "transparent";
    btnExcluirDoc.style.cursor = "pointer";

    btnExcluirDoc.addEventListener("click", () => {
      if (confirm(`Excluir o documento "${docNome}" da coleção "${nomeColecao}"?`)) {
        const idx = colecoes[nomeColecao].indexOf(docNome);
        if (idx > -1) colecoes[nomeColecao].splice(idx, 1);
        item.remove();
      }
    });

    item.appendChild(btnExcluirDoc);
    lista.appendChild(item);

    colecoes[nomeColecao].push(docNome);
    input.value = "";
  };

  window.abrirModal = function () {
    document.getElementById('modalSolicitacao').style.display = 'flex';
  };

  window.fecharModal = function () {
    document.getElementById('modalSolicitacao').style.display = 'none';
  };

  window.enviarSolicitacao = function () {
    const mensagem = document.getElementById('mensagemSolicitacao').value.trim();
    if (!mensagem) {
      alert("Por favor, escreva a solicitação antes de enviar.");
      return;
    }

    alert("Solicitação enviada com sucesso!");
    document.getElementById('mensagemSolicitacao').value = '';
    fecharModal();
  };

  window.addEventListener('click', function (event) {
    const modal = document.getElementById('modalSolicitacao');
    if (event.target === modal) {
      fecharModal();
    }
  });

  document.querySelectorAll('.solicitacaoBtn').forEach(btn => {
    btn.addEventListener('click', abrirModal);
  });

  document.getElementById("ver_observacao").addEventListener("click", function() {
    window.open("https://mail.google.com/", "_blank");
  });

  document.getElementById("visualizar").addEventListener("click", function() {
    window.open("./arquivo.html"), "_blank";
  })

});