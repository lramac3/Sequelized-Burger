
// Set up MySQL connection.
const mysql = require("mysql");

let connection;
//If deployed
if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else { //If running on localhost
    connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: process.env.DB_PW,
        database: "sei4ysj76n7s5wv0"
    });
};

// Make connection.
connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
        console.log("connected as id " + connection.threadId);
});

// Export connection for our ORM to use.
module.exports = connection;
