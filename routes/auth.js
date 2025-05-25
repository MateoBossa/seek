const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const users = require('../users');

// BD
const db = require('../config/db');

// Ver página principal protegida
router.get('/', async (req, res) => {
  if (req.session.userId) {
    try {
      const [tarjetas] = await db.execute(
        'SELECT * FROM tarjetas WHERE usuario_id = ?', 
        [req.session.userId]
      );
      res.render('success', { nombre: req.session.nombre, tarjetas });
    } catch (err) {
      console.error('Error al obtener tarjetas:', err);
      res.status(500).send('Error del servidor');
    }
  } else {
    res.redirect('/login');
  }
});

// Vista Principal
router.get('/home', (req, res) => {
  res.render('home');
});

// Vista Registro
router.get('/register', (req, res) => {
  res.render('register');
});

// Vista Login
router.get('/login', (req, res) => {
  res.render('login');
});

// Peticion Registro
router.post('/register', async (req, res) => {
  const { username, apellidos, correo, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const sql = 'INSERT INTO users (nombres, apellidos, correo, contrasena) VALUES (?, ?, ?, ?)';
    await db.execute(sql, [username, apellidos, correo, hashedPassword]);
    res.redirect('/login');
  } catch (err) {
    console.error('Error en el registro:', err);
    res.send('Error al registrar');
  }
});

// Peticion Login
router.post('/login', async (req, res) => {
  const { correo, password } = req.body;

  try {
    const sql = 'SELECT * FROM users WHERE correo = ?';
    const [results] = await db.execute(sql, [correo]);

    if (results.length === 0) {
      return res.send('Correo no registrado. <a href="/login">Volver</a>');
    }

    const user = results[0];
    const validPassword = await bcrypt.compare(password, user.contrasena);

    if (!validPassword) {
      return res.send('Contraseña incorrecta. <a href="/login">Volver</a>');
    }

    req.session.userId = user.id;
    req.session.nombre = user.nombres;
    res.redirect('/');
  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).send('Error del servidor');
  }
});

// Crear nueva tarjeta
router.post('/tarjetas', async (req, res) => {
  const { titulo, descripcion, fecha_recordatorio, prioridad, categoria_id } = req.body;
  await db.execute(
    `INSERT INTO tarjetas (usuario_id, titulo, descripcion, fecha_recordatorio, prioridad, categoria_id)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [req.session.userId, titulo, descripcion, fecha_recordatorio, prioridad, categoria_id || null]
  );
  res.redirect('/');
});

// Eliminar tarjeta
router.post('/tarjetas/:id/eliminar', async (req, res) => {
  const id = req.params.id;
  await db.execute('DELETE FROM tarjetas WHERE id = ? AND usuario_id = ?', [id, req.session.userId]);
  res.redirect('/');
});

// Editar tarjeta (solo ejemplo, lo puedes adaptar)
router.post('/tarjetas/:id/editar', async (req, res) => {
  const { titulo, descripcion, fecha_recordatorio, prioridad, categoria_id } = req.body;
  await db.execute(
    `UPDATE tarjetas SET titulo = ?, descripcion = ?, fecha_recordatorio = ?, prioridad = ?, categoria_id = ?
     WHERE id = ? AND usuario_id = ?`,
    [titulo, descripcion, fecha_recordatorio, prioridad, categoria_id || null, req.params.id, req.session.userId]
  );
  res.redirect('/');
});

// Cerrar sesión
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

module.exports = router;
