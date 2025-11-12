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