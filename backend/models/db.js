const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

// const connexion = mysql.createConnection({
//     host: dbConfig.HOST,
//     user: dbConfig.USER,
//     password: dbConfig.PASSWORD,
//     database: dbConfig.DATABASE,
// });

const connexion = mysql.createConnection(
    "mysql://admin:E44fi88e+@localhost:3306/groupomania"
);
connexion.connect((error) => {
    if (error) throw error;
    console.log("connexion reussi!!!");
});

module.exports = connexion;
