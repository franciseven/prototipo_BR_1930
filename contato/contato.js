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

  const outroPaisInput = document.getElementById('outro-pais');
  const outroEstadoInput = document.getElementById('outro-estado');
  const outraCidadeExteriorInput = document.getElementById('outra-cidade-exterior');

  const selectAssunto = document.getElementById('assunto');
  const outroAssuntoInput = document.getElementById('outro-assunto');

  const formulario = document.getElementById('cadastro-form');

  const cidadesPorEstado = {
    'Paraiba': ['João Pessoa', 'Campina Grande', 'Patos', 'Sousa', 'Cajazeiras', 'Outra Cidade'],
    'Minas Gerais': ['Belo Horizonte', 'Uberlândia', 'Contagem', 'Juiz de Fora', 'Montes Claros', 'Outra Cidade'],
    'Rio Grande do Sul': ['Porto Alegre', 'Caxias do Sul', 'Pelotas', 'Santa Maria', 'Passo Fundo', 'Outra Cidade']
  };

  const estadosPorPais = {
    'Estados Unidos da América': {
      'Califórnia': ['Los Angeles', 'San Francisco', 'San Diego', 'Outra Cidade'],
      'Nova York': ['Nova York', 'Buffalo', 'Rochester', 'Outra Cidade'],
      'Texas': ['Houston', 'Dallas', 'Austin', 'Outra Cidade']
    },
    'Canadá': {
      'Ontário': ['Toronto', 'Ottawa', 'Hamilton', 'Outra Cidade'],
      'Quebec': ['Montreal', 'Quebec City', 'Laval', 'Outra Cidade'],
      'Colúmbia Britânica': ['Vancouver', 'Victoria', 'Richmond', 'Outra Cidade']
    },
    'Portugal': {
      'Lisboa': ['Lisboa', 'Sintra', 'Cascais', 'Outra Cidade'],
      'Porto': ['Porto', 'Vila Nova de Gaia', 'Matosinhos', 'Outra Cidade'],
      'Coimbra': ['Coimbra', 'Figueira da Foz', 'Cantanhede', 'Outra Cidade']
    }
  };

  function limparSelect(selectElem, textoPadrao) {
    selectElem.innerHTML = '';
    const optionPadrao = document.createElement('option');
    optionPadrao.value = '';
    optionPadrao.textContent = textoPadrao;
    optionPadrao.disabled = true;
    optionPadrao.selected = true;
    selectElem.appendChild(optionPadrao);
  }

  // =======================
  // CONTROLES DE LOCALIDADE
  // =======================
  estadoSelect.addEventListener('change', () => {
    const estado = estadoSelect.value;

    if (estado === 'Exterior') {
      cidadeContainer.style.display = 'none';
      limparSelect(cidadeSelect, 'Selecione sua cidade');
      cidadeSelect.required = false;
      outraCidadeInput.style.display = 'none';
      outraCidadeInput.required = false;
      outraCidadeInput.value = '';

      exteriorContainer.style.display = 'block';
      paisSelect.required = true;

      limparSelect(estadoExteriorSelect, 'Selecione o estado');
      estadoExteriorContainer.style.display = 'none';
      estadoExteriorSelect.required = false;

      limparSelect(cidadeExteriorSelect, 'Selecione a cidade');
      cidadeExteriorContainer.style.display = 'none';
      cidadeExteriorSelect.required = false;

      outroPaisInput.style.display = 'none';
      outroPaisInput.required = false;
      outroPaisInput.value = '';
      outroEstadoInput.style.display = 'none';
      outroEstadoInput.required = false;
      outroEstadoInput.value = '';
      outraCidadeExteriorInput.style.display = 'none';
      outraCidadeExteriorInput.required = false;
      outraCidadeExteriorInput.value = '';

    } else if (cidadesPorEstado[estado]) {
      cidadeContainer.style.display = 'block';
      limparSelect(cidadeSelect, 'Selecione sua cidade');
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
      estadoExteriorSelect.required = false;

      cidadeExteriorContainer.style.display = 'none';
      cidadeExteriorSelect.required = false;

      outraCidadeInput.style.display = 'none';
      outraCidadeInput.required = false;
      outraCidadeInput.value = '';

      outroPaisInput.style.display = 'none';
      outroPaisInput.required = false;
      outroPaisInput.value = '';
      outroEstadoInput.style.display = 'none';
      outroEstadoInput.required = false;
      outroEstadoInput.value = '';
      outraCidadeExteriorInput.style.display = 'none';
      outraCidadeExteriorInput.required = false;
      outraCidadeExteriorInput.value = '';

    } else {
      cidadeContainer.style.display = 'none';
      limparSelect(cidadeSelect, 'Selecione sua cidade');
      cidadeSelect.required = false;
      outraCidadeInput.style.display = 'none';
      outraCidadeInput.required = false;
      outraCidadeInput.value = '';

      exteriorContainer.style.display = 'none';
      paisSelect.required = false;

      estadoExteriorContainer.style.display = 'none';
      estadoExteriorSelect.required = false;

      cidadeExteriorContainer.style.display = 'none';
      cidadeExteriorSelect.required = false;

      outroPaisInput.style.display = 'none';
      outroPaisInput.required = false;
      outroPaisInput.value = '';
      outroEstadoInput.style.display = 'none';
      outroEstadoInput.required = false;
      outroEstadoInput.value = '';
      outraCidadeExteriorInput.style.display = 'none';
      outraCidadeExteriorInput.required = false;
      outraCidadeExteriorInput.value = '';
    }
  });

  cidadeSelect.addEventListener('change', () => {
    if (cidadeSelect.value === 'Outra Cidade') {
      outraCidadeInput.style.display = 'block';
      outraCidadeInput.required = true;
    } else {
      outraCidadeInput.style.display = 'none';
      outraCidadeInput.required = false;
      outraCidadeInput.value = '';
    }
  });

  paisSelect.addEventListener('change', () => {
    const pais = paisSelect.value;

    limparSelect(estadoExteriorSelect, 'Selecione o estado');
    estadoExteriorContainer.style.display = 'none';
    estadoExteriorSelect.required = false;

    limparSelect(cidadeExteriorSelect, 'Selecione a cidade');
    cidadeExteriorContainer.style.display = 'none';
    cidadeExteriorSelect.required = false;

    outroPaisInput.style.display = 'none';
    outroPaisInput.required = false;
    outroPaisInput.value = '';
    outroEstadoInput.style.display = 'none';
    outroEstadoInput.required = false;
    outroEstadoInput.value = '';
    outraCidadeExteriorInput.style.display = 'none';
    outraCidadeExteriorInput.required = false;
    outraCidadeExteriorInput.value = '';

    if (pais === 'Outro País') {
      outroPaisInput.style.display = 'block';
      outroPaisInput.required = true;
      outroEstadoInput.style.display = 'block';
      outroEstadoInput.required = true;
      outraCidadeExteriorInput.style.display = 'block';
      outraCidadeExteriorInput.required = true;
    } else if (estadosPorPais[pais]) {
      Object.keys(estadosPorPais[pais]).forEach(estado => {
        const option = document.createElement('option');
        option.value = estado;
        option.textContent = estado;
        estadoExteriorSelect.appendChild(option);
      });
      estadoExteriorContainer.style.display = 'block';
      estadoExteriorSelect.required = true;
    }
  });

  estadoExteriorSelect.addEventListener('change', () => {
    const pais = paisSelect.value;
    const estado = estadoExteriorSelect.value;

    limparSelect(cidadeExteriorSelect, 'Selecione a cidade');

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

  cidadeExteriorSelect.addEventListener('change', () => {
    if (cidadeExteriorSelect.value === 'Outra Cidade') {
      outraCidadeExteriorInput.style.display = 'block';
      outraCidadeExteriorInput.required = true;
    } else {
      outraCidadeExteriorInput.style.display = 'none';
      outraCidadeExteriorInput.required = false;
      outraCidadeExteriorInput.value = '';
    }
  });

  // =======================
  // CONFIGURAÇÃO DO QUILL
  // =======================
  const quill = new Quill('#editor', {
    theme: 'snow',
    placeholder: 'Digite aqui sua mensagem...',
    modules: {
      toolbar: '#toolbar'
    }
  });

  const attachmentsContainer = document.getElementById('attachments');
  const fileInput = document.createElement('input');
  fileInput.setAttribute('type', 'file');
  fileInput.setAttribute('multiple', true);
  fileInput.style.display = 'none';
  document.body.appendChild(fileInput);

  const toolbar = quill.getModule('toolbar');
  toolbar.addHandler('link', () => {
    fileInput.click();
  });

  fileInput.addEventListener('change', (e) => {
    for (const file of e.target.files) {
      addAttachment(file);
    }
    fileInput.value = '';
  });

  quill.root.addEventListener('drop', handleFileDrop, false);
  quill.root.addEventListener('dragover', (e) => e.preventDefault(), false);

  function handleFileDrop(e) {
    e.preventDefault();
    const files = e.dataTransfer.files;
    for (const file of files) {
      addAttachment(file);
    }
  }

  // =======================
  // FUNÇÃO DE ANEXOS
  // =======================
  function addAttachment(file) {
    const assuntoAtual = selectAssunto.value;
    const extensao = file.name.split('.').pop().toLowerCase();

    // 🔒 Se assunto for "Artigo - Blog", só aceita .docx
    if (assuntoAtual === 'blog' && extensao !== 'docx') {
      alert('Apenas arquivos .docx são permitidos para o assunto "Artigo - Blog".');
      return;
    }

    const card = document.createElement('div');
    card.className = 'attachment';
    card.innerHTML = `<span>${file.name}</span> <button type="button">x</button>`;
    card.querySelector('button').onclick = () => card.remove();
    attachmentsContainer.appendChild(card);
  }

  // =======================
  // RESTRIÇÃO DE ARQUIVOS POR ASSUNTO
  // =======================
  selectAssunto.addEventListener('change', function () {
    if (this.value === 'outro') {
      outroAssuntoInput.style.display = 'block';
      outroAssuntoInput.setAttribute('required', 'required');
    } else {
      outroAssuntoInput.style.display = 'none';
      outroAssuntoInput.removeAttribute('required');
      outroAssuntoInput.value = '';
    }

    // 🎯 Define tipos de arquivo permitidos conforme assunto
    if (this.value === 'blog') {
      fileInput.setAttribute('accept', '.docx');
    } else {
      fileInput.removeAttribute('accept');
    }
  });

	// =======================
	// EXIBIR PDF SE ASSUNTO FOR BLOG
	// =======================
	selectAssunto.addEventListener('change', function () {
		const pdfExistente = document.getElementById('pdf-blog');
		if (pdfExistente) pdfExistente.remove(); // remove PDF anterior, se houver

		if (this.value === 'blog') {
			const pdfEmbed = document.createElement('embed');
			pdfEmbed.id = 'pdf-blog';
			pdfEmbed.src = './INSTRUCOES_PARA_ENVIO_DE_ARTIGO_AO_BLOG.pdf';
			pdfEmbed.type = 'application/pdf';
			pdfEmbed.width = '499px';
			pdfEmbed.height = '150px';
			
			// Insere abaixo da label de Assunto
			const labelAssunto = document.querySelector('label[for="assunto"]');
			labelAssunto.insertAdjacentElement('afterend', pdfEmbed);
		}
	});

  // =======================
  // ENVIO DO FORMULÁRIO
  // =======================
  formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    function todosObrigatoriosPreenchidos(form) {
      const campos = form.querySelectorAll('[required]');
      for (const campo of campos) {
        if (campo.offsetParent === null) continue;
        const valor = (campo.value || '').trim();
        if (!valor) return false;
      }
      return true;
    }

    function textoSelecionado(id) {
      const el = document.getElementById(id);
      if (!el) return '';
      if (el.tagName.toLowerCase() === 'select') {
        const opt = el.options[el.selectedIndex];
        return opt ? opt.textContent.trim() : (el.value || '').trim();
      }
      return (el.value || '').trim();
    }

    if (!todosObrigatoriosPreenchidos(formulario)) return;

    const nome = textoSelecionado('nome-completo');
    const dataNasc = textoSelecionado('data-nascimento');
    const estado = textoSelecionado('estado');
    const cidade = textoSelecionado('cidade');
    const outraCidade = textoSelecionado('outra-cidade');
    const pais = textoSelecionado('pais');
    const estadoExt = textoSelecionado('estado-exterior');
    const cidadeExt = textoSelecionado('cidade-exterior');
    const outroPais = textoSelecionado('outro-pais');
    const outroEstado = textoSelecionado('outro-estado');
    const outraCidadeExt = textoSelecionado('outra-cidade-exterior');
    const assuntoValor = document.getElementById('assunto').value;
    const assuntoTexto = textoSelecionado('assunto');
    const outroAssunto = textoSelecionado('outro-assunto');

    const mensagemHTML = quill.root.innerHTML.trim();
    const mensagemTexto = quill.getText().trim();

    const anexos = Array.from(document.querySelectorAll('.attachment span')).map(el => el.textContent);

    let linhas = [];
    linhas.push(`Nome Completo: ${nome}`);

    if (dataNasc) {
      const partes = dataNasc.split('-');
      const dataFormatada = `${partes[2]}/${partes[1]}/${partes[0]}`;
      linhas.push(`Data de Nascimento: ${dataFormatada}`);
    }

    if (estado === 'Exterior') {
      linhas.push(`Estado: Exterior`);
      linhas.push(`País: ${pais}`);
      if (pais === 'Outro País') {
        linhas.push(`Outro País: ${outroPais}`);
        linhas.push(`Outro Estado: ${outroEstado}`);
        linhas.push(`Outra Cidade (Exterior): ${outraCidadeExt}`);
      } else {
        linhas.push(`Estado (Exterior): ${estadoExt}`);
        linhas.push(`Cidade (Exterior): ${cidadeExt}`);
        if (cidadeExt === 'Outra Cidade' && outraCidadeExt) {
          linhas.push(`Outra Cidade (Exterior): ${outraCidadeExt}`);
        }
      }
    } else {
      linhas.push(`Estado: ${estado}`);
      if (cidade) linhas.push(`Cidade: ${cidade}`);
      if (cidade === 'Outra Cidade' && outraCidade) {
        linhas.push(`Outra Cidade: ${outraCidade}`);
      }
    }

    linhas.push(`Assunto: ${assuntoTexto}`);
    if (assuntoValor === 'outro' && outroAssunto) {
      linhas.push(`Outro Assunto: ${outroAssunto}`);
    }

    if (mensagemTexto) {
      linhas.push(`Mensagem: ${mensagemTexto}`);
    }

    if (anexos.length > 0) {
      linhas.push(`Anexos: ${anexos.join(', ')}`);
    }

    const resumo = 'Confirme as informações antes de enviar:\n\n' + linhas.join('\n');

    if (confirm(resumo)) {
      alert(`📧 Informações enviadas com sucesso!\n\nMensagem enviada:\n${mensagemTexto}`);
      formulario.submit();
    }
  });
});