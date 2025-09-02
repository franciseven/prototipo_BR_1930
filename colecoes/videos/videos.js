const tabs = document.querySelectorAll('.tab');
const filtros = document.querySelectorAll('.filtros');

tabs.forEach(tab => {
	tab.addEventListener('click', () => {
		tabs.forEach(t => t.classList.remove('active'));
		filtros.forEach(f => f.style.display = 'none');

		tab.classList.add('active');
		const targetId = tab.getAttribute('data-target');
		const targetFiltro = document.getElementById(targetId);
		if (targetFiltro) {
			targetFiltro.style.display = 'block';
		}
	});
});

document.querySelectorAll('.toggle-descricao').forEach(button => {
	button.addEventListener('click', (e) => {
		e.preventDefault();
		const descricao = button.previousElementSibling;
		descricao.classList.toggle('collapsed');
		button.textContent = descricao.classList.contains('collapsed') ? 'Mostrar mais' : 'Mostrar menos';
	});
});

const selectMes = document.querySelector('#filtros-data select:nth-of-type(2)');
const selectDia = document.querySelector('#filtros-data select:nth-of-type(3)');
const selectAno = document.querySelector('#filtros-data select:nth-of-type(1)');

selectMes.addEventListener('change', () => {
	const mes = selectMes.selectedIndex;
	const ano = parseInt(selectAno.value);
	let diasNoMes = 31;

	if (mes === 2) {
		diasNoMes = (!isNaN(ano) && ((ano % 4 === 0 && ano % 100 !== 0) || ano % 400 === 0)) ? 29 : 28;
	} else if ([4, 6, 9, 11].includes(mes)) {
		diasNoMes = 30;
	}

	selectDia.innerHTML = '<option>(Escolha o dia)</option>';
	for (let d = 1; d <= diasNoMes; d++) {
		const opt = document.createElement('option');
		opt.value = d;
		opt.textContent = d;
		selectDia.appendChild(opt);
	}
});

function configurarFiltroDinamico(selectPrincipalId, mapaDeSelects, inputId = null) {
	const selectPrincipal = document.getElementById(selectPrincipalId);
	const selectsSecundarios = Object.values(mapaDeSelects).map(id => document.getElementById(id));
	const input = inputId ? document.getElementById(inputId) : null;

	selectPrincipal.addEventListener('change', () => {
		const valorSelecionado = selectPrincipal.value;

		selectsSecundarios.forEach(select => {
			select.style.display = 'none';
			select.selectedIndex = 0;
		});

		if (input) input.value = '';

		if (mapaDeSelects[valorSelecionado]) {
			const idSelecionado = mapaDeSelects[valorSelecionado];
			const selectParaMostrar = document.getElementById(idSelecionado);
			if (selectParaMostrar) {
				selectParaMostrar.style.display = 'inline-block';
			}
		}
	});
}

function configurarFiltroAutor(selectId, selectAutorId, inputAutorId) {
	const select = document.getElementById(selectId);
	const selectAutor = document.getElementById(selectAutorId);
	const inputAutor = document.getElementById(inputAutorId);

	if (!select || !selectAutor || !inputAutor) return;

	select.addEventListener('change', () => {
		const valor = select.value;
		if (valor === 'autor') {
			selectAutor.style.display = 'inline-block';
			inputAutor.style.display = 'inline-block';
		} else {
			selectAutor.style.display = 'none';
			inputAutor.style.display = 'none';
			selectAutor.selectedIndex = 0;
			inputAutor.value = '';
		}
	});

	inputAutor.addEventListener('input', () => {
		selectAutor.selectedIndex = 0;
	});
}

configurarFiltroAutor('filmagens-select', 'filmagens-autor-select', 'filmagens-autor-texto');
configurarFiltroAutor('entrevistas-select', 'entrevistas-autor-select', 'entrevistas-autor-texto');
configurarFiltroAutor('documentarios-select', 'documentarios-autor-select', 'documentarios-autor-texto');
configurarFiltroAutor('filmes-select', 'filmes-autor-select', 'filmes-autor-texto');

configurarFiltroDinamico(
	'filmagens-select',
	{
		duracao: 'filmagens-duracao-select',
		formato: 'filmagens-formato-select',
		autor: 'filmagens-autor-select'
	},
	'filmagens-input'
);

configurarFiltroDinamico(
	'entrevistas-select',
	{
		duracao: 'entrevistas-duracao-select',
		formato: 'entrevistas-formato-select',
		autor: 'entrevistas-autor-select'
	},
	'entrevistas-input'
);

configurarFiltroDinamico(
	'documentarios-select',
	{
		duracao: 'documentarios-duracao-select',
		formato: 'documentarios-formato-select',
		autor: 'documentarios-autor-select'
	},
	'documentarios-input'
);

configurarFiltroDinamico(
	'filmes-select',
	{
		duracao: 'filmes-duracao-select',
		formato: 'filmes-formato-select',
		autor: 'filmes-autor-select'
	},
	'filmes-input'
);