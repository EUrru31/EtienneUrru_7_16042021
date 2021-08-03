const sql = require("./db.js");

// constructor
const User = function (users) {
    this.email = users.email;
    this.nom = users.nom;
    this.prenom = users.prenom;
    this.admin = users.admin;
    this.password = users.password;
};

User.create = (newUser, result) => {
    sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, { id: res.insertId, ...newUser });
    });
};

User.findOne = (email, result) => {
    sql.query(`SELECT * FROM users WHERE email= ?`, [email], (err, res) => {
        if (err) {
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        // not found User with the id
        result({ kind: "not_found" }, null);
    });
};
User.findById = (id, result) => {
    sql.query(`SELECT * FROM users WHERE id= ?`, [id], (err, res) => {
        if (err) {
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        // not found User with the id
        result({ kind: "not_found" }, null);
    });
};

User.getAll = (result) => {
    sql.query("SELECT * FROM users", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

User.updateById = (id, nom, prenom, email, admin, password, result) => {
    sql.query(
        "UPDATE users SET nom = ?, prenom = ?, email = ?, admin = ?, password = ? WHERE id = ?",
        [user.nom, user.prenom, user.email, user.admin, user.password, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found User with the id
                result({ kind: "not_found" }, null);
                return;
            }

            result(null, { id: id, ...user });
        }
    );
};

User.remove = (id, result) => {
    sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found User with the id
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, res);
    });
};

User.removeAll = (result) => {
    sql.query("DELETE FROM users", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

module.exports = User;
