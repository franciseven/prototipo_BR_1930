const tabs = document.querySelectorAll('.tab');
const filtros = document.querySelectorAll('.filtros');
const adicionarFiltroBtn = document.getElementById('adicionarFiltroBtn');
const removerFiltroBtn = document.getElementById('removerFiltroBtn');
const finalizarFiltrosBtn = document.getElementById('finalizarFiltrosBtn');

let modoMultiplo = false;
let modoRemocao = false;
let filtrosAtivos = new Set();

function atualizarExibicaoFiltros() {
	filtros.forEach(filtro => filtro.style.display = 'none');
	filtrosAtivos.forEach(id => {
	const el = document.getElementById(id);
	if (el) el.style.display = 'block';
	});
}

function resetarFiltros() {
	filtrosAtivos.clear();
	tabs.forEach(t => t.classList.remove('active'));
	filtros.forEach(f => f.style.display = 'none');
}

tabs.forEach(tab => {
	tab.addEventListener('click', () => {
	const targetId = tab.getAttribute('data-target');

	if ((targetId === 'filtros-recentes' && filtrosAtivos.has('filtros-data')) ||
			(targetId === 'filtros-data' && filtrosAtivos.has('filtros-recentes'))) {
			alert("Você não pode combinar 'Submissões Recentes' com 'Data de Publicação'.");
			return;
	}

	if (modoMultiplo) {
			if (filtrosAtivos.has(targetId)) {
			alert("Filtro já adicionado.");
			return;
			}
			tab.classList.add('active');
			filtrosAtivos.add(targetId);
			atualizarExibicaoFiltros();
			return;
	}

	if (modoRemocao) {
			if (!filtrosAtivos.has(targetId)) {
			alert("Filtro não está ativo.");
			return;
			}
			tab.classList.remove('active');
			filtrosAtivos.delete(targetId);
			atualizarExibicaoFiltros();
			return;
	}

	resetarFiltros();
	tab.classList.add('active');
	filtrosAtivos.add(targetId);
	atualizarExibicaoFiltros();
	});
});

adicionarFiltroBtn.addEventListener('click', () => {
	modoMultiplo = true;
	modoRemocao = false;
	alert("Modo de combinação de filtros ativado. Clique nos filtros que deseja adicionar.");
});

removerFiltroBtn.addEventListener('click', () => {
	modoRemocao = true;
	modoMultiplo = false;
	alert("Modo de remoção de filtros ativado. Clique nos filtros que deseja remover.");
});

finalizarFiltrosBtn.addEventListener('click', () => {
	modoRemocao = false;
	modoMultiplo = false;
	alert("Seleção de filtros finalizada. Os filtros ativos foram aplicados.");
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