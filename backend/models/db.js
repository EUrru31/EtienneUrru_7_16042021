const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

// const connexion = mysql.createConnection({
//     host: dbConfig.HOST,
//     user: dbConfig.USER,
//     password: dbConfig.PASSWORD,
//     database: dbConfig.DB,
// });

const connexion = mysql.createConnection(
    "mysql://student:E44fi88e+@localhost:3306/groupomania"
);
connexion.connect((error) => {
    if (error) {
        console.log("error");
        console.log(error);
        return;
    }
    console.log("connexion reussi!!!");
});

module.exports = connexion;
