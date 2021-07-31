const sql = require("../models/db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/users.js");

exports.signup = (req, res) => {
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const email = req.body.email;
    const password = req.body.password;
    const admin = req.body.admin;

    if (nom === "" || prenom === "" || email === "" || password === "") {
        return res.status(400).json({
            error: "Veuillez remplir le formulaire",
        });
    }

    //Sécurisation avec Bcrypt
    bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
            const user = new User({
                nom: nom,
                prenom: prenom,
                email: email,
                password: hash,
                admin: admin,
            });
            User.create(user, (err, data) => {
                if (err) {
                    res.status(400).json({ err });
                    return;
                }
                res.status(201).json({ message: "Utilisateur créé !" });
            });
        })
        .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res) => {
    User.findOne(req.body.email, (err, user) => {
        if (err) {
            return res.status(401).json({ error: "Utilisateur non trouvé !" });
        }
        bcrypt
            .compare(req.body.password, user.password)
            .then((valid) => {
                if (!valid) {
                    return res
                        .status(401)
                        .json({ error: "Mot de passe incorrect !" });
                }
                console.log(user);
                res.status(200).json({
                    user: user,
                    token: jwt.sign(
                        { email: user.email },
                        "RANDOM_TOKEN_SECRET",
                        {
                            expiresIn: "24h",
                        }
                    ),
                });
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({ error });
            });
    });
};

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    // Create a User
    const user = new User({
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        admin: req.body.admin,
        password: req.body.password,
    });

    // Save User in the database
    User.create(user, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while creating the User.",
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    User.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving users.",
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    User.findOne(req.params.userId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with id ${req.params.userId}.`,
                });
            } else {
                res.status(500).send({
                    message:
                        "Error retrieving User with id " + req.params.userId,
                });
            }
        } else res.send(data);
    });
};

exports.findById = (req, res) => {
    User.findById(req.params.userId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with id ${req.params.userId}.`,
                });
            } else {
                res.status(500).send({
                    message:
                        "Error retrieving User with id " + req.params.userId,
                });
            }
        } else res.send(data);
    });
};

exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    User.updateById(req.params.userId, new User(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with id ${req.params.userId}.`,
                });
            } else {
                res.status(500).send({
                    message: "Error updating User with id " + req.params.userId,
                });
            }
        } else res.send(data);
    });
};

exports.delete = (req, res) => {
    User.remove(req.params.userId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with id ${req.params.userId}.`,
                });
            } else {
                res.status(500).send({
                    message:
                        "Could not delete User with id " + req.params.userId,
                });
            }
        } else res.send({ message: `User was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    User.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while removing all users.",
            });
        else res.send({ message: `All users were deleted successfully!` });
    });
};
