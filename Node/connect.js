//We are including mysql2 library.
const mysql = require("mysql2");
//We are now creating a connection to mysql
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "westsidenode",
  password: "keerthankumar",
});
console.log(connection);
module.exports = connection;
