/* Requires */
const mysql = require('mysql2');

/* Create MYSQL Connection */
    // statements
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '7619518o',
      database: 'social'
    });
    
    connection.connect()
    connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
      if (err) throw err
        console.log('The solution is: ', rows[0].solution)
    });

module.exports = {
  connection
};