const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "guna-1234",
  database: "wikipage",
});

module.exports = pool.promise(); 
