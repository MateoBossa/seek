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


// Mostrar/ocultar el contenido al hacer click en la tarjeta
document.querySelectorAll('.tarjeta').forEach(tarjeta => {
  tarjeta.addEventListener('click', () => {
    const contenido = tarjeta.querySelector('.tarjeta-contenido');
    const icono = tarjeta.querySelector('.icon-ojo');

    if (contenido.classList.contains('oculto')) {
      contenido.classList.remove('oculto');
      icono.textContent = '👁️'; // cambia a ojo abierto
    } else {
      contenido.classList.add('oculto');
      icono.textContent = '🙈'; // ojo tapado
    }
  });
});

// Detalle de la tarjeta
document.querySelectorAll('.tarjeta').forEach(tarjeta => {
  tarjeta.addEventListener('click', () => {
    const id = tarjeta.dataset.id;
    // Aquí abres un modal con la info completa (puedes hacer fetch o usar info almacenada)
    abrirModalConDetalle(id);
  });
});


function getColorAleatorio() {
  const letras = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letras[Math.floor(Math.random() * 16)];
  }
  return color;
}

function crearTarjeta(tarjeta) {
  const div = document.createElement('div');
  div.classList.add('tarjeta');
  div.dataset.id = tarjeta.id;

  const icono = document.createElement('span');
  icono.className = 'icon-ojo';
  icono.textContent = '🙈';

  const titulo = document.createElement('h3');
  titulo.textContent = tarjeta.titulo;

  // Color aleatorio
  titulo.style.color = getColorAleatorio();

  div.appendChild(icono);
  div.appendChild(titulo);

  document.getElementById('tarjetas-container').appendChild(div);
}

