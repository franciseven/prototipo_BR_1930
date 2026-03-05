const verifyBtn = document.getElementById('verify-btn');
const authInput = document.getElementById('auth-code');

verifyBtn.addEventListener('click', () => {
	const code = authInput.value.trim();
	if (code === "123456") {
		window.location.href = "../perfil/administrador.html";
	} else {
		alert("Código incorreto. Tente novamente.");
		authInput.value = "";
		authInput.focus();
	}
});

authInput.addEventListener('keypress', (e) => {
	if (e.key === "Enter") {
		verifyBtn.click();
	}
});