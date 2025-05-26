// Mostrar y Ocultar el modal de la tarjeta
const modal = document.getElementById('modal-tarjeta');
const btnAbrir = document.getElementById('btn-nueva');
const btnCancelar = document.getElementById('cancelar-modal');
const mainContent = document.getElementById('main-content');

// Funcion abrir para crear una nueva tarjeta
btnAbrir.addEventListener('click', () => {
  modal.classList.remove('hidden');
  mainContent.classList.add('blur');
});
// Cancelar crear una nueva tarjeta
btnCancelar.addEventListener('click', () => {
  modal.classList.add('hidden');
  mainContent.classList.remove('blur');
});


// Mostrar primeramente (descripcion y 3 puntos)
document.querySelectorAll('.icon-ojo').forEach(span => {
  const originalContent = span.innerHTML;

  span.addEventListener('click', e => {
    e.stopPropagation();

    const descripcion = span.dataset.descripcion;
    const prioridad = span.dataset.prioridad;
    const creado = span.dataset.creado;
    const actualizado = span.dataset.actualizado;
    const titulo = span.closest('.tarjeta').querySelector('h3').innerText;

    if (span.classList.contains('expandido')) {
      // Colapsar
      span.innerHTML = originalContent;
      span.classList.remove('expandido');
      span.style.flexDirection = '';
      span.style.justifyContent = '';
      span.style.alignItems = '';
      span.style.gap = '';
    } else {
      // Expandir
      span.innerHTML = `
        <p class="txt-descripcion"><strong>Descripción:</strong> ${descripcion}</p>
        <i class='bx bx-dots-horizontal-rounded threedots' style='color:#333; cursor: pointer;'></i>
      `;

      span.classList.add('expandido');
      span.style.flexDirection = 'column';
      span.style.justifyContent = 'center';
      span.style.alignItems = 'center';
      span.style.gap = '5px';

      // Esperar que se renderice el ícono para poder agregar el evento
      setTimeout(() => {
        span.querySelector('.threedots').addEventListener('click', e => {
          e.stopPropagation();
          document.getElementById('modal-titulo').innerText = titulo;
          document.getElementById('modal-descripcion').innerText = descripcion;
          document.getElementById('modal-prioridad').innerText = prioridad;
          document.getElementById('modal-creado').innerText = creado;
          document.getElementById('modal-actualizado').innerText = actualizado;
          document.getElementById('modal-detalle').classList.remove('oculto');
        });
      }, 0);
    }
  });
});

// Cerrar el modal
document.querySelector('.cerrar-modal').addEventListener('click', () => {
  document.getElementById('modal-detalle').classList.add('oculto');
});


