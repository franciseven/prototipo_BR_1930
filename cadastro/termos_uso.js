document.addEventListener('DOMContentLoaded', function () {
	const checkbox = document.getElementById('aceitar-termos');
	const botao = document.getElementById('finalizar-btn');

	checkbox.addEventListener('change', () => {
		botao.disabled = !checkbox.checked;
	});

	botao.addEventListener('click', () => {
		window.location.href = "../perfil_telas/usuario_perfil.html";
	});
});