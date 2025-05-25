const db = require('./config/db');

db.query('SELECT * FROM users', (err, results) => {
  if (err) {
    return console.error('Error ejecutando consulta:', err);
  }
  console.log(results);
});
