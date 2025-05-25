// Mostrar y Ocultar el modal de la tarjeta
const modal = document.getElementById('modal-tarjeta');
const btnAbrir = document.getElementById('btn-nueva');
const btnCancelar = document.getElementById('cancelar-modal');
const mainContent = document.getElementById('main-content');

btnAbrir.addEventListener('click', () => {
  modal.classList.remove('hidden');
  mainContent.classList.add('blur');
});

btnCancelar.addEventListener('click', () => {
  modal.classList.add('hidden');
  mainContent.classList.remove('blur');
});

