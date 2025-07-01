const popup = document.getElementById('popup');
const popupMessage = document.getElementById('popup-message');
const closeBtn = document.getElementById('close-popup');

function showPopup(message) {
  popupMessage.textContent = message;
  popup.classList.remove('popup-hidden');
}

function hidePopup() {
  popup.classList.add('popup-hidden');
}

closeBtn.addEventListener('click', hidePopup);

popup.addEventListener('click', (e) => {
  if (e.target === popup) {
    hidePopup();
  }
});

// Exportamos la función para usarla en otro archivo
export { showPopup, hidePopup };
