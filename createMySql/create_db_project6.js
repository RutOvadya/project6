// var mysql = require('mysql2');


// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "2424",
//   port: 3306
// });

// con.connect(function(err) {
//   if (err) throw err; 
//   console.log("Connected!");
// });

var mysql = require('mysql2');


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "2424",
  port: 3306
});

con.connect(function(err) {
  if (err) throw err; 
  console.log("Connected!");
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("CREATE DATABASE project6", function (err, result) {
      if (err) throw err;
      console.log("Database created");
    });
  });

