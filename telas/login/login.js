document.getElementById('login-form').addEventListener('submit', function (e) {
  e.preventDefault();

  if (this.checkValidity()) {
    window.location.href = "../perfil/administrador.html";
  } else {
    this.reportValidity();
  }
});