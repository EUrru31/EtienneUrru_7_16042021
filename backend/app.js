const express = require("express");
const helmet = require("helmet");
const app = express();
const path = require("path");

const userRoutes = require("./routes/users");
const postsRoutes = require("./routes/posts");
const commentsRoutes = require("./routes/comments");
require("dotenv").config();

app.use(helmet());

// Autorisation des requètes
// Accès à l'API depuis n'importe quelle origine
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use("/api/auth", userRoutes);
app.use("/posts", postsRoutes);
app.use("/comments", commentsRoutes);

module.exports = app;
