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

	const form = document.getElementById('cadastro-form');
	form.addEventListener('submit', (e) => {
		e.preventDefault();

		if (estadoSelect.value === 'Exterior') {
			paisSelect.required = true;
			estadoExteriorSelect.required = estadoExteriorContainer.style.display === 'block';
			cidadeExteriorSelect.required = cidadeExteriorContainer.style.display === 'block';
			cidadeSelect.required = false;
		} else {
			cidadeSelect.required = cidadeContainer.style.display === 'block';
			paisSelect.required = false;
			estadoExteriorSelect.required = false;
			cidadeExteriorSelect.required = false;
		}

		const senhaInput = document.getElementById('senha');
		const senhaAjuda = document.getElementById('senha-ajuda');

		let valido = true;

		if (!senhaForte(senhaInput.value)) {
			senhaAjuda.style.display = 'block';
			valido = false;
		} else {
			senhaAjuda.style.display = 'none';
		}

		if (!valido) return;

		if (form.checkValidity()) {
			window.location.href = "./codigo_autenticacao.html";
		} else {
			form.reportValidity();
		}
	});
});