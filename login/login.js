document.getElementById('login-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const senhaInput = document.getElementById('senha');
  const senha = senhaInput.value;

  function senhaForte(senha) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\-_#])[A-Za-z\d@$!%*?&\-_#]{8,}$/;
    return regex.test(senha);
  }

  if (!senhaForte(senha)) {
    senhaInput.setCustomValidity(
      "A senha deve ter no mínimo 8 caracteres, incluindo letra maiúscula, minúscula, número e caractere especial."
    );
    senhaInput.reportValidity();
    return;
  } else {
    senhaInput.setCustomValidity("");
  }

  if (this.checkValidity()) {
    window.location.href = "../perfil/administrador.html";
  } else {
    this.reportValidity();
  }
});