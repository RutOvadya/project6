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
    var sql = "CREATE TABLE photos (id INT AUTO_INCREMENT PRIMARY KEY, albumId INT, title VARCHAR(255), thumbnailUrl LONGTEXT)";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table altered");
    });
  });




