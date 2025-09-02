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

function pesquisar() {
	const termo = document.getElementById("pesquisaGeral").value.toLowerCase();
	const itens = document.querySelectorAll(".lista-itens .item");

	itens.forEach(item => {
		const titulo = item.querySelector("h3").textContent.toLowerCase();
		const autor = item.querySelector(".autor").textContent.toLowerCase();
		const descricao = item.querySelector(".descricao").textContent.toLowerCase();

		if (titulo.includes(termo) || autor.includes(termo) || descricao.includes(termo)) {
			item.style.display = "flex";
		} else {
			item.style.display = "none";
		}
	});
}