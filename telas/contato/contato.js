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

	selectAssunto.addEventListener('change', function () {
		if (this.value === 'outro') {
			outroAssuntoInput.style.display = 'block';
			outroAssuntoInput.setAttribute('required', 'required');
		} else {
			outroAssuntoInput.style.display = 'none';
			outroAssuntoInput.removeAttribute('required');
			outroAssuntoInput.value = '';
		}
	});

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

	formulario.addEventListener('submit', (e) => {
		e.preventDefault();

		if (!todosObrigatoriosPreenchidos(formulario)) {
			return;
		}

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

		const mensagemEl = formulario.querySelector('textarea');
		const mensagem = mensagemEl ? (mensagemEl.value || '').trim() : '';

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

		if (mensagem) {
			linhas.push(`Mensagem: ${mensagem}`);
		}

		const resumo = 'Confirme as informações antes de enviar:\n\n' + linhas.join('\n');

		if (confirm(resumo)) {
			alert("Informações enviadas");
			formulario.submit();
		}
	});
});