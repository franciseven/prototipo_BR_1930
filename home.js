// Versão do popup com fechamento temporário, reaparecendo o mesmo quando a tela é reiniciada
window.addEventListener('load', () => {
  // --- Popup Colab ---
  const popup = document.getElementById('popup-colab');
  const closeBtn = popup.querySelector('.close-btn');
  let timeoutId;
  let remainingTime = 10000;
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
  const images = Array.from(track.children);

  // Clona imagens para loop contínuo
  images.forEach(img => {
    const clone = img.cloneNode(true);
    track.appendChild(clone);
  });

  const allImages = Array.from(track.querySelectorAll('img'));
  let loadedCount = 0;

  function startAnimation() {
    track.style.animationPlayState = 'running';
  }

  // Espera todas as imagens carregarem
  allImages.forEach(img => {
    if (img.complete) {
      loadedCount++;
    } else {
      img.addEventListener('load', () => {
        loadedCount++;
        if (loadedCount === allImages.length) {
          startAnimation();
        }
      });
    }
  });

  if (loadedCount === allImages.length) {
    startAnimation();
  }

  // --- Tooltip ---
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  document.body.appendChild(tooltip);

  allImages.forEach(img => {
    img.addEventListener('mouseenter', e => {
      // Pausa a animação
      track.style.animationPlayState = 'paused';

      // Mostra tooltip da imagem correta
      const desc = img.getAttribute('data-desc');
      if (desc) {
        tooltip.textContent = desc;
        tooltip.style.opacity = '1';
      }
    });

    img.addEventListener('mousemove', e => {
      // Atualiza posição do tooltip
      tooltip.style.left = (e.pageX + 15) + 'px';
      tooltip.style.top = (e.pageY + 15) + 'px';
    });

    img.addEventListener('mouseleave', () => {
      // Retoma a animação
      track.style.animationPlayState = 'running';
      tooltip.style.opacity = '0';
    });
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