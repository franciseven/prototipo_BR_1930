document.querySelector('.download-link').addEventListener('click', function (e) {
	e.preventDefault();
	document.getElementById('overlay').style.display = 'flex';
});

document.querySelector('.close-overlay').addEventListener('click', function () {
	document.getElementById('overlay').style.display = 'none';
});