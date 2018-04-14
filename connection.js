var mysql = require("mysql");
// Create the connection
var connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
});

module.exports = connection;
