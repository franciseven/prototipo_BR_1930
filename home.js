window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('popup-colab').style.display = 'block';
  }, 2000);
});

const heroImages = document.querySelectorAll('.hero-images img');

const tooltip = document.createElement('div');
tooltip.className = 'tooltip';
document.body.appendChild(tooltip);

heroImages.forEach(img => {
  img.addEventListener('mousemove', e => {
    tooltip.style.opacity = '1';
    tooltip.textContent = img.getAttribute('data-desc');
    const offsetX = 15;
    const offsetY = 15;
    tooltip.style.left = (e.pageX + offsetX) + 'px';
    tooltip.style.top = (e.pageY + offsetY) + 'px';
  });
  img.addEventListener('mouseleave', () => {
    tooltip.style.opacity = '0';
  });
});