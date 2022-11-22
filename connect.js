const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: "sql12.freemysqlhosting.net",
    user: "sql12551013",
    password: "Lf1E1MvNBE",
    database: "sql12551013",
    port: "3306"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected to MySQL Server.");
});

module.exports = connection;