document.querySelectorAll('.toggle-descricao').forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    const descricao = button.previousElementSibling;
    descricao.classList.toggle('collapsed');
    button.textContent = descricao.classList.contains('collapsed') ? 'Mostrar mais' : 'Mostrar menos';
  });
});