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
      `Conteúdo enviado com sucesso!\n\n` +
      `Título: ${titulo}\n` +
      `Autores: ${authors.join(", ")}\n` +
      `Anotações: ${anotacoes ? anotacoes : 'Nenhuma anotação'}\n` +
      `Metadados: ${metadadosSelecionados.join(", ")}\n` +
      `Visibilidade: ${visibilidade}\n` +
      `Arquivo enviado: ${arquivo.name}`
    );
  });
});

  document.querySelectorAll(".approveBtn").forEach((btn) => {
    btn.addEventListener("click", () => {
      alert("Conteúdo aprovado, email de aprovação enviado para o usuário!");
    });
  });

  document.querySelectorAll(".rejectBtn").forEach((btn) => {
    btn.addEventListener("click", () => {
      alert("Conteúdo rejeitado, email de rejeição enviado para o usuário!");
    });
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

  document.querySelectorAll(".deleteBtn").forEach((btn) => {
    btn.addEventListener("click", () => {
      alert("Conteúdo removido, email de remoção enviado para o responsável!");
    });
  });