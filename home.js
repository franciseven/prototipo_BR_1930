window.addEventListener('load', () => {
  // Versão do popup com fechamento temporário, reaparecendo o mesmo quando a tela é reiniciada
  // --- Popup Colab ---
  const popup = document.getElementById('popup-colab');
  const closeBtn = popup.querySelector('.close-btn');
  let timeoutId;
  let remainingTime = 20000;
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

  // --- Toggle Filtros Avançados ---
  document.getElementById("toggleFiltrosBtn").addEventListener("click", function() {
    const filtros = document.getElementById("filtrosAvancados");
    if (filtros.style.display === "none" || filtros.style.display === "") {
      filtros.style.display = "block";
      this.textContent = "- Busca Avançada";
    } else {
      filtros.style.display = "none";
      this.textContent = "+ Busca Avançada";
    }
  });

  // --- Slideshow ---
  const track = document.querySelector('.slide-track');
  const images = Array.from(track.querySelectorAll('img'));

  track.innerHTML += track.innerHTML;
  const totalImages = images.length;
  track.style.width = `${(totalImages * 2) * (100 / 3)}%`;
  const duration = totalImages * 10;
  track.style.animationDuration = `${duration}s`;

  // --- Tooltip ---
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  document.body.appendChild(tooltip);

  let mouseX = 0, mouseY = 0;
  let rafId = null;

  function updateTooltipPosition() {
    tooltip.style.left = (mouseX + 15) + 'px';
    tooltip.style.top = (mouseY + 15) + 'px';
    rafId = null;
  }

  track.addEventListener('mouseover', e => {
    if (e.target.tagName === 'IMG') {
      track.style.animationPlayState = 'paused';
      const desc = e.target.getAttribute('data-desc');
      if (desc) {
        tooltip.textContent = desc;
        tooltip.style.opacity = '1';
      }
    }
  });

  track.addEventListener('mousemove', e => {
    mouseX = e.pageX;
    mouseY = e.pageY;

    if (!rafId) {
      rafId = requestAnimationFrame(updateTooltipPosition);
    }
  });

  track.addEventListener('mouseout', e => {
    if (e.target.tagName === 'IMG') {
      track.style.animationPlayState = 'running';
      tooltip.style.opacity = '0';
    }
  });
})






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