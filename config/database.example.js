const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "tu usario de mysql",
  password: "tu contraseña",
  database: "expressSQL",
});

db.connect();

module.exports = db;