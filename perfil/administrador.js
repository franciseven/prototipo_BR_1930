document.addEventListener("DOMContentLoaded", () => {
  let authors = [];
  let uploadedFiles = [];

  const addAuthorBtn = document.getElementById('addAuthorBtn');
  const autorInput = document.getElementById('autorInput');
  const authorsList = document.getElementById('authorsList');
  const btn = document.getElementById("submitContentBtn");
  const fileInput = document.getElementById("fileUpload");

  // =======================
  // EXIBIÇÃO DO NOME DO ARQUIVO
  // =======================
  const fileNameDisplay = document.createElement("p");
  fileNameDisplay.style.fontWeight = "bold";
  fileNameDisplay.style.marginTop = "8px";
  fileNameDisplay.style.color = "#444";
  fileInput.parentNode.insertBefore(fileNameDisplay, fileInput.nextSibling);

  fileInput.addEventListener("change", () => {
    if (fileInput.files.length > 0) {
      uploadedFiles = Array.from(fileInput.files).map(f => f.name);
      fileNameDisplay.textContent = `Arquivos selecionados: ${uploadedFiles.join(", ")}`;
    } else {
      uploadedFiles = [];
      fileNameDisplay.textContent = "";
    }
  });

  // =======================
  // AUTORES
  // =======================
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

  // =======================
  // DINÂMICA DO PROPRIETÁRIO
  // =======================
  const proprietarioSelect = document.getElementById("proprietario");
  const outroProprietarioContainer = document.getElementById("outro-proprietario-container");
  const novoProprietarioInput = document.getElementById("novo-proprietario");
  const adicionarProprietarioBtn = document.getElementById("adicionar-proprietario-btn");

  outroProprietarioContainer.style.display = "none";

  proprietarioSelect.addEventListener("change", () => {
    if (proprietarioSelect.value === "outro") {
      outroProprietarioContainer.style.display = "block";
      novoProprietarioInput.focus();
    } else {
      outroProprietarioContainer.style.display = "none";
      novoProprietarioInput.value = "";
    }
  });

  adicionarProprietarioBtn.addEventListener("click", () => {
    const novoNome = novoProprietarioInput.value.trim();

    if (novoNome === "") {
      alert("Digite um nome para o novo proprietário.");
      return;
    }

    const jaExiste = Array.from(proprietarioSelect.options).some(
      opt => opt.text.toLowerCase() === novoNome.toLowerCase()
    );
    if (jaExiste) {
      alert("Esse proprietário já existe na lista.");
      return;
    }

    const novaOpcao = document.createElement("option");
    novaOpcao.value = novoNome.toLowerCase().replace(/\s+/g, "_");
    novaOpcao.text = novoNome;

    proprietarioSelect.insertBefore(novaOpcao, proprietarioSelect.querySelector('option[value="outro"]'));
    proprietarioSelect.value = novaOpcao.value;

    novoProprietarioInput.value = "";
    outroProprietarioContainer.style.display = "none";
  });

  // =======================
  // RESETAR FORMULÁRIO
  // =======================
  function resetForm() {
    document.getElementById("titulo").value = "";
    authors = [];
    uploadedFiles = [];
    authorsList.innerHTML = "";
    document.querySelectorAll("input[name='keyword']").forEach(cb => cb.checked = false);
    fileInput.value = "";
    fileNameDisplay.textContent = "";
    document.getElementById("annotation").value = "";
    document.getElementById("visibility").value = "restrito";
  }

  // =======================
  // CHECKBOX “OUTRO”
  // =======================
  const outroCheckbox = document.getElementById("outro-checkbox");
  const outroContainer = document.getElementById("outro-input-container");
  const adicionarBtn = document.getElementById("adicionar-btn");
  const novoItemInput = document.getElementById("novo-item");

  outroContainer.style.display = "none";

  outroCheckbox.addEventListener("change", function() {
    if (this.checked) {
      outroContainer.style.display = "block";
      novoItemInput.focus();
    } else {
      outroContainer.style.display = "none";
      novoItemInput.value = "";
    }
  });

  adicionarBtn.addEventListener("click", function() {
    const novoValor = novoItemInput.value.trim();
    if (novoValor === "") return;

    const grupo = outroCheckbox.closest(".checkbox-group");
    const checkboxes = grupo.querySelectorAll('input[type="checkbox"]');

    for (const cb of checkboxes) {
      if (cb.value.toLowerCase() === novoValor.toLowerCase()) {
        alert("Essa palavra-chave já existe!");
        novoItemInput.value = "";
        novoItemInput.focus();
        return;
      }
    }

    const novoLabel = document.createElement("label");
    const novoCheckbox = document.createElement("input");
    novoCheckbox.type = "checkbox";
    novoCheckbox.name = "keyword";
    novoCheckbox.value = novoValor.toLowerCase();

    novoLabel.appendChild(novoCheckbox);
    novoLabel.appendChild(document.createTextNode(" " + novoValor));

    grupo.insertBefore(novoLabel, outroCheckbox.parentElement);

    novoItemInput.value = "";
    novoItemInput.focus();
  });

  // =======================
  // ENVIO DOS DADOS
  // =======================
  btn.addEventListener("click", function (e) {
    e.preventDefault();

    const titulo = document.getElementById("titulo").value.trim();
    const anotacoes = document.getElementById("annotation").value.trim();
    const visibilidade = document.getElementById("visibility").options[document.getElementById("visibility").selectedIndex].text;

    const dataValor = document.getElementById("data").value;

    const proprietarioValor = proprietarioSelect.options[proprietarioSelect.selectedIndex].text;

    const colecaoCheckboxes = document.querySelectorAll("#colecoes-checkboxes input[type='checkbox']:checked");
    const colecaoValor = Array.from(colecaoCheckboxes).map(cb => cb.value);

    const palavrasChaveCheckboxes = document.querySelectorAll("#metadados-checkboxes input[type='checkbox']:checked");
    const palavrasChaveValor = Array.from(palavrasChaveCheckboxes)
      .filter(cb => cb.id !== "outro-checkbox")
      .map(cb => cb.value);

    if (!titulo) {
      alert("Por favor, preencha o campo Título.");
      return;
    }
    if (authors.length === 0) {
      alert("Por favor, adicione pelo menos um autor.");
      return;
    }
    if (uploadedFiles.length === 0) {
      alert("Por favor, selecione um arquivo para upload.");
      return;
    }
    if (colecaoValor.length === 0) {
      alert("Por favor, selecione pelo menos uma coleção.");
      return;
    }
    if (palavrasChaveValor.length === 0) {
      alert("Por favor, selecione pelo menos uma palavra-chave.");
      return;
    }

    const dados = {
      titulo,
      autores: authors,
      data: dataValor,
      proprietario: proprietarioValor,
      colecoes: colecaoValor,
      palavrasChave: palavrasChaveValor,
      anotacoes,
      visibilidade,
      arquivos: uploadedFiles
    };

    console.log("Dados a enviar:", dados);

    alert(
      `Conteúdo enviado com sucesso!\n\n` +
      `Título: ${titulo}\n` +
      `Autores: ${authors.join(", ")}\n` +
      `Data: ${dataValor}\n` +
      `Proprietário: ${proprietarioValor}\n` +
      `Coleções: ${colecaoValor.join(", ")}\n` +
      `Palavras-Chave: ${palavrasChaveValor.join(", ")}\n` +
      `Anotações: ${anotacoes ? anotacoes : 'Nenhuma anotação'}\n` +
      `Visibilidade: ${visibilidade}\n` +
      `Arquivos enviados: ${uploadedFiles.join(", ")}`
    );

    resetForm();
  });


  // =======================
  // BOTÃO DE EDIÇÃO (EXEMPLO)
  // =======================
  document.querySelectorAll(".editBtn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.getElementById("titulo").value = "Como se Combate o Cangaceirismo na Parahyba";
      authors = ["Jornal A Manhã (RJ)"];
      uploadedFiles = ["capa_territorio_1.jpg"];
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
      const palavrasChave = ["territorio", "periodico"];
      document.querySelectorAll("input[name='keyword']").forEach(cb => {
        cb.checked = palavrasChave.includes(cb.value);
      });
      fileNameDisplay.textContent = "Arquivo anexado: " + uploadedFiles.join(", ");
      document.getElementById("annotation").value = "";
      document.getElementById("visibility").value = "livre";
    });
  });

  // =======================
  // CONFIGURAÇÃO DO QUILL
  // =======================
  const quill = new Quill('#editor', {
    theme: 'snow',
    placeholder: 'Digite o texto do blog',
    modules: {
      toolbar: '#toolbar'
    }
  });

  const attachmentsContainer = document.getElementById('attachments');
  const toolbar = quill.getModule('toolbar');
  toolbar.addHandler('link', () => fileInput.click());

  quill.root.addEventListener('drop', handleFileDrop, false);
  quill.root.addEventListener('dragover', (e) => e.preventDefault(), false);

  function handleFileDrop(e) {
    e.preventDefault();
    const files = e.dataTransfer.files;
    for (const file of files) addAttachment(file);
  }

  function addAttachment(file) {
    const card = document.createElement('div');
    card.className = 'attachment';
    card.innerHTML = `<span>${file.name}</span> <button type="button">x</button>`;
    card.querySelector('button').onclick = () => card.remove();
    attachmentsContainer.appendChild(card);
  }
});

// =======================
// FUNÇÃO PARA O BLOG
// =======================
document.addEventListener("DOMContentLoaded", () => {
  // =======================
  // VARIÁVEIS DO BLOG
  // =======================
  let blogAuthors = [];
  let blogUploadedFilesAutor = [];
  let blogUploadedFilesCapa = [];

  const blogTitulo = document.getElementById("blog_titulo");
  const blogAutorInput = document.getElementById("blog_autorInput");
  const blogAddAuthorBtn = document.getElementById("blog_addAuthorBtn");
  const blogAuthorsList = document.getElementById("blog_authorsList");
  const blogFileUploadAutor = document.getElementById("blog_fileUploadAutor");
  const blogFileUploadCapa = document.getElementById("blog_fileUploadCapa");
  const blogSubmitBtn = document.getElementById("blog_submitContentBtn");
  const blogAnnotation = document.getElementById("blog_annotation");
  const blogDescricao = document.getElementById("blog_descricao");
  const blogFonte = document.getElementById("blog_fonte");
  const blogData = document.getElementById("blog_data");
  const blogProprietarioSelect = document.getElementById("blog_proprietario");
  const blogOutroProprietarioContainer = document.getElementById("blog-outro-proprietario-container");
  const blogNovoProprietarioInput = document.getElementById("blog-novo-proprietario");
  const blogAdicionarProprietarioBtn = document.getElementById("blog-adicionar-proprietario-btn");

  // =======================
  // DINÂMICA DO PROPRIETÁRIO (BLOG)
  // =======================
  blogOutroProprietarioContainer.style.display = "none";

  blogProprietarioSelect.addEventListener("change", () => {
    if (blogProprietarioSelect.value === "outro") {
      blogOutroProprietarioContainer.style.display = "block";
      blogNovoProprietarioInput.focus();
    } else {
      blogOutroProprietarioContainer.style.display = "none";
      blogNovoProprietarioInput.value = "";
    }
  });

  blogAdicionarProprietarioBtn.addEventListener("click", () => {
    const novoNome = blogNovoProprietarioInput.value.trim();

    if (novoNome === "") {
      alert("Digite um nome para o novo proprietário.");
      return;
    }

    const jaExiste = Array.from(blogProprietarioSelect.options).some(
      opt => opt.text.toLowerCase() === novoNome.toLowerCase()
    );
    if (jaExiste) {
      alert("Esse proprietário já existe na lista.");
      return;
    }

    const novaOpcao = document.createElement("option");
    novaOpcao.value = novoNome.toLowerCase().replace(/\s+/g, "_");
    novaOpcao.text = novoNome;

    blogProprietarioSelect.insertBefore(
      novaOpcao,
      blogProprietarioSelect.querySelector('option[value="outro"]')
    );
    blogProprietarioSelect.value = novaOpcao.value;

    blogNovoProprietarioInput.value = "";
    blogOutroProprietarioContainer.style.display = "none";
  });

  // =======================
  // EXIBIÇÃO DO NOME DO ARQUIVO (AUTOR)
  // =======================
  const blogFileAutorDisplay = document.createElement("p");
  blogFileAutorDisplay.style.fontWeight = "bold";
  blogFileAutorDisplay.style.marginTop = "8px";
  blogFileAutorDisplay.style.color = "#444";
  blogFileUploadAutor.parentNode.insertBefore(blogFileAutorDisplay, blogFileUploadAutor.nextSibling);

  blogFileUploadAutor.addEventListener("change", () => {
    if (blogFileUploadAutor.files.length > 0) {
      blogUploadedFilesAutor = Array.from(blogFileUploadAutor.files).map(f => f.name);
      blogFileAutorDisplay.textContent = `Arquivo selecionado: ${blogUploadedFilesAutor.join(", ")}`;
    } else {
      blogUploadedFilesAutor = [];
      blogFileAutorDisplay.textContent = "";
    }
  });

  // =======================
  // EXIBIÇÃO DO NOME DO ARQUIVO (CAPA)
  // =======================
  const blogFileCapaDisplay = document.createElement("p");
  blogFileCapaDisplay.style.fontWeight = "bold";
  blogFileCapaDisplay.style.marginTop = "8px";
  blogFileCapaDisplay.style.color = "#444";
  blogFileUploadCapa.parentNode.insertBefore(blogFileCapaDisplay, blogFileUploadCapa.nextSibling);

  blogFileUploadCapa.addEventListener("change", () => {
    if (blogFileUploadCapa.files.length > 0) {
      blogUploadedFilesCapa = Array.from(blogFileUploadCapa.files).map(f => f.name);
      blogFileCapaDisplay.textContent = `Arquivo selecionado: ${blogUploadedFilesCapa.join(", ")}`;
    } else {
      blogUploadedFilesCapa = [];
      blogFileCapaDisplay.textContent = "";
    }
  });

  // =======================
  // ADICIONAR AUTOR (HTML fixo)
  // =======================
  blogAddAuthorBtn.addEventListener("click", () => {
    const newAuthor = blogAutorInput.value.trim();
    if (!newAuthor) {
      alert("Favor inserir pelo menos um autor ao clicar no botão");
      return;
    }
    if (blogAuthors.includes(newAuthor)) {
      alert("Autores com o mesmo nome não são permitidos.");
      return;
    }
    blogAuthors.push(newAuthor);

    const li = document.createElement("li");
    li.textContent = newAuthor;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "×";
    removeBtn.style.marginLeft = "8px";
    removeBtn.style.color = "red";
    removeBtn.style.border = "none";
    removeBtn.style.background = "transparent";
    removeBtn.style.cursor = "pointer";
    removeBtn.title = "Remover autor";

    removeBtn.addEventListener("click", () => {
      blogAuthorsList.removeChild(li);
      blogAuthors = blogAuthors.filter(a => a !== newAuthor);
    });

    li.appendChild(removeBtn);
    blogAuthorsList.appendChild(li);
    blogAutorInput.value = "";
  });

  // =======================
  // QUILL EDITOR
  // =======================
  const blogQuill = new Quill("#blog_editor", {
    theme: "snow",
    placeholder: "Digite o texto do blog",
    modules: { toolbar: "#blog_toolbar" }
  });

  const blogAttachmentsContainer = document.getElementById("blog_attachments");
  const blogToolbar = blogQuill.getModule("toolbar");
  blogToolbar.addHandler("link", () => blogFileUploadCapa.click());

  blogQuill.root.addEventListener("drop", handleBlogFileDrop, false);
  blogQuill.root.addEventListener("dragover", (e) => e.preventDefault(), false);

  function handleBlogFileDrop(e) {
    e.preventDefault();
    const files = e.dataTransfer.files;
    for (const file of files) addBlogAttachment(file);
  }

  function addBlogAttachment(file) {
    const card = document.createElement("div");
    card.className = "attachment";
    card.innerHTML = `<span>${file.name}</span> <button type="button">x</button>`;
    card.querySelector("button").onclick = () => card.remove();
    blogAttachmentsContainer.appendChild(card);
  }

  // =======================
  // ENVIO DE DADOS DO BLOG
  // =======================
  blogSubmitBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const titulo = blogTitulo.value.trim();
    const anotacoes = blogAnnotation.value.trim();
    const descricao = blogDescricao.value.trim();
    const fonte = blogFonte.value.trim();
    const dataValor = blogData.value;
    const lattesLink = document.getElementById("blog_lattes").value.trim();
    const editorContent = blogQuill.root.innerHTML;
    const proprietarioFinal =
      blogProprietarioSelect.options[blogProprietarioSelect.selectedIndex].text;

    // === Validação ===
    if (!titulo) return alert("Preencha o título.");
    if (blogAuthors.length === 0) return alert("Adicione pelo menos um autor.");
    if (blogUploadedFilesAutor.length === 0) return alert("Selecione a foto do autor.");
    if (blogUploadedFilesCapa.length === 0) return alert("Selecione a capa do blog.");

    // === Dados reunidos ===
    const blogDataToSend = {
      titulo,
      autores: blogAuthors,
      data: dataValor,
      proprietario: proprietarioFinal,
      descricao,
      fonte,
      anotacoes,
      lattes: lattesLink,
      editorContent,
      arquivosAutor: blogUploadedFilesAutor,
      arquivosCapa: blogUploadedFilesCapa
    };

    console.log("Dados do Blog a enviar:", blogDataToSend);

    const resumoEditor =
      editorContent.replace(/<[^>]*>?/gm, "").slice(0, 120) +
      (editorContent.length > 120 ? "..." : "");

    alert(
      `📰 Submissão para o Blog concluída!\n\n` +
        `Título: ${titulo}\n` +
        `Autores: ${blogAuthors.join(", ")}\n` +
        `Data: ${dataValor}\n` +
        `Proprietário: ${proprietarioFinal}\n` +
        `Lattes: ${lattesLink || "—"}\n` +
        `Descrição: ${descricao || "—"}\n` +
        `Fonte: ${fonte || "—"}\n` +
        `Anotações: ${anotacoes || "—"}\n` +
        `Texto do Blog: ${resumoEditor || "—"}\n` +
        `Foto do Autor: ${blogUploadedFilesAutor.join(", ")}\n` +
        `Capa do Blog: ${blogUploadedFilesCapa.join(", ")}`
    );

    // === Reset ===
    blogTitulo.value = "";
    blogAuthors = [];
    blogAuthorsList.innerHTML = "";
    blogAutorInput.value = "";
    blogUploadedFilesAutor = [];
    blogUploadedFilesCapa = [];
    blogFileAutorDisplay.textContent = "";
    blogFileCapaDisplay.textContent = "";
    blogDescricao.value = "";
    blogFonte.value = "";
    blogAnnotation.value = "";
    document.getElementById("blog_lattes").value = "";
    blogData.value = "";
    blogProprietarioSelect.value = "matheus_silveira";
    blogOutroProprietarioContainer.style.display = "none";
    blogNovoProprietarioInput.value = "";
    blogQuill.root.innerHTML = "";
    blogAttachmentsContainer.innerHTML = "";
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

  function configurarFullscreen(botaoId, containerId, titleId) {
    const tabelaContainer = document.getElementById(containerId);
    const expandBtn = document.getElementById(botaoId);
    const fullscreenTitle = document.getElementById(titleId);

    const closeBtn = document.createElement("button");
    closeBtn.innerHTML = "✖";
    closeBtn.classList.add("close-fullscreen");
    closeBtn.style.display = "none";
    document.body.appendChild(closeBtn);

    const overlay = document.createElement("div");
    overlay.classList.add("fullscreen-overlay");
    document.body.appendChild(overlay);

    expandBtn.addEventListener("click", () => {
      tabelaContainer.classList.add("fullscreen");
      overlay.classList.add("active");
      document.body.classList.add("noscroll");
      closeBtn.style.display = "block";
      fullscreenTitle.style.display = "block";
    });

    function closeFullscreen() {
      tabelaContainer.classList.remove("fullscreen");
      overlay.classList.remove("active");
      document.body.classList.remove("noscroll");
      closeBtn.style.display = "none";
      fullscreenTitle.style.display = "none";
    }

    closeBtn.addEventListener("click", closeFullscreen);
    overlay.addEventListener("click", closeFullscreen);
  }

  configurarFullscreen("table_extension_historico", "tabelaContainer_historico", "titleFullscreen_historico");
  configurarFullscreen("table_extension_pendentes", "tabelaContainer_pendentes", "titleFullscreen_pendentes");
  configurarFullscreen("table_extension_fluxo", "tabelaContainer_fluxo", "titleFullscreen_fluxo");