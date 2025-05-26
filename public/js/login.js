 // Mostrar el modal si hay un mensaje de error
const modal = document.getElementById('modal-error');
    if (modal) {
        modal.classList.add('show');
        setTimeout(() => {
        modal.classList.remove('show');
    }, 1500); // se muestra 1.5 segundos
}