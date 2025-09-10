// Versão do popup com fechamento temporário, reaparecendo o mesmo quando a tela é reiniciada
window.addEventListener('load', () => {
  const popup = document.getElementById('popup-colab');
  const closeBtn = popup.querySelector('.close-btn');
  let timeoutId;
  let remainingTime = 6000;
  let startTime;

  setTimeout(() => {
    popup.style.display = 'block';
    startTime = Date.now();
    timeoutId = setTimeout(() => {
      popup.style.display = 'none';
    }, remainingTime);
  }, 2000);

  popup.addEventListener('mouseenter', () => {
    clearTimeout(timeoutId);
    remainingTime -= (Date.now() - startTime);
  });

  popup.addEventListener('mouseleave', () => {
    startTime = Date.now();
    timeoutId = setTimeout(() => {
      popup.style.display = 'none';
    }, remainingTime);
  });

  closeBtn.addEventListener('click', () => {
    popup.style.display = 'none';
  });
});

/* Versão com o fechamento definitivo do popup quando o usuário clicar no 'x'
window.addEventListener('load', () => {
  const popup = document.getElementById('popup-colab');
  const closeBtn = popup.querySelector('.close-btn');
  const popupKey = 'popupClosed';
  let timeoutId;
  let remainingTime = 7000;
  let startTime;

  if (localStorage.getItem(popupKey)) return;

  setTimeout(() => {
    popup.style.display = 'block';
    startTime = Date.now();

    timeoutId = setTimeout(() => {
      popup.style.display = 'none';
    }, remainingTime);
  }, 2000);

  popup.addEventListener('mouseenter', () => {
    clearTimeout(timeoutId);
    remainingTime -= (Date.now() - startTime);
  })

  popup.addEventListener('mouseleave', () => {
    startTime = Date.now();
    timeoutId = setTimeout(() => {
      popup.style.display = 'none';
    }, remainingTime);
  })

  closeBtn.addEventListener('click', () => {
    popup.style.display = 'none';
    localStorage.setItem(popupKey, 'true');
  })
});
*/

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