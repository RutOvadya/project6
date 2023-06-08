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
    var sql = "CREATE TABLE comments (id INT AUTO_INCREMENT PRIMARY KEY, postId INT, name VARCHAR(255),  email VARCHAR(255), body VARCHAR(255))";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table altered");
    });
  });

// var mysql = require('mysql2');

// var con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "2424",
//     port: 3306,
//     database: 'project6'
// });

// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     var sql = "ALTER TABLE comments MODIFY COLUMN body LONGTEXT";
//     con.query(sql, function (err, result) {
//         if (err) throw err;
//         console.log("Table altered");
//     });
// });

// var mysql = require('mysql2');

// var con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "2424",
//     port: 3306,
//     database: 'project6'
// });

// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     var sql = "DELETE FROM comments";
//     con.query(sql, function (err, result) {
//         if (err) throw err;
//         console.log("Content deleted from the table");
//     });
// });




