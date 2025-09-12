const input = document.getElementById('profile-photo');
const preview = document.getElementById('preview');
const removeBtn = document.getElementById('remove-photo');
const proceedBtn = document.getElementById('proceed-step');

input.addEventListener('change', function () {
	const file = this.files[0];
	if (file) {
		const reader = new FileReader();
		reader.onload = function (e) {
			preview.src = e.target.result;
		}
		reader.readAsDataURL(file);
	}
});

removeBtn.addEventListener('click', function () {
	input.value = '';
	preview.src = '../icones/default-profile.png';
});

proceedBtn.addEventListener('click', function () {
	if (!input.files.length) {
		const confirmProceed = confirm("Foto de perfil não inserida! Tem certeza que não gostaria de enviar uma foto de perfil?\n\nClique em OK para ir para a próxima tela!\nClique em Cancelar para permanecer nesta!");
		if (confirmProceed) {
			window.location.href = '../perfil/usuario.html';
		}
	} else {
		alert("Foto de perfil inserida com Sucesso!");
		window.location.href = "../perfil/usuario.html"
	}
});