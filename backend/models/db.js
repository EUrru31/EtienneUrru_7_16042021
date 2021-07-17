const mysql = require("mysql");

const connexion = mysql.createConnection(
    "mysql://admin:E44fi88e+@localhost:3306/groupomania"
);
connexion.connect((error) => {
    if (error) throw error;
    console.log("connexion reussi!!!");
});

module.exports = connexion;
