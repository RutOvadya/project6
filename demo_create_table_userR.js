var mysql = require('mysql2');

var con = mysql.createConnection({
    host: "localhost",
  user: "root",
  password: "2424",
  port: 3306,
  database: 'project6'
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "CREATE TABLE usersR (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), password VARCHAR(255))";
    //"ALTER TABLE users ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table altered");
    });
  });

