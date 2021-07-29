<template>
    <div>
        <div class="header">
            <img
                class="logo"
                alt="logo groupomania"
                src="../assets/icon-left-font-monochrome-black.svg"
            />
            <nav class="navbar navbar-expand navbar-light fixed-top">
                <div class="container">
                    <div class="collapse navbar-collapse">
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item">
                                <a href="/home" class="navbar-brand">Acceuil</a>
                            </li>
                            <li class="nav-item">
                                <a href="/profile" class="nav-link"
                                    >Mon Profil</a
                                >
                            </li>
                            <li class="nav-item">
                                <a @click="logout()" class="button"
                                    >Déconnexion</a
                                >
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
        <div class="wall">
            <form class="publication">
                <input
                    v-model="title"
                    class="input title"
                    autocomplete="text"
                    placeholder="Titre"
                />
                <input
                    v-model="content"
                    class="input content"
                    autocomplete="text"
                    placeholder="Contenu"
                />
            </form>
            <button class="publication-button" v-on:click="createPost()">
                Publier
            </button>
        </div>
        <div class="wall">
            <h4>Dernières publications</h4>
            <!-- <template v-for="post in posts" class="card_field">
            <p :key="post.id">{{ post.userId.nom }}{{ post.userId.prenom }}</p>
            <h3 :key="post.id">{{ post.title }}</h3>
            <p :key="post.id">{{ post.content }}</p>
            <div class="like" :key="post.id">
                <i class="far fa-heart fa-lg"></i>
                <i class="fas fa-heart"></i>
            </div>
        </template> -->
        </div>
    </div>
</template>

<script>
const axios = require("axios");
export default {
    name: "Home",
    data: function() {
        return {
            posts: [],
        };
    },
    methods: {
        updatePost() {
            axios
                .get("http://localhost:3000/posts/")
                .then((reponse) => (this.posts = reponse.data));
        },
        createPost() {
            axios.get("http://localhost:3000/posts/post", {});
        },
        logout() {
            this.$store.commit("logout");
            this.$router.push("/");
        },
    },
};
</script>

<style scoped>
.container {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    margin-left: 40px;
    margin-right: 40px;
}

.navbar-nav {
    display: flex;
    justify-content: flex-end;
    margin-right: 40px;
    text-decoration: none;
    list-style-type: none;
}
.nav-item {
    margin-right: 40px;
}
.header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
h1 {
    margin: auto;
}
.logo {
    width: 400px;
    margin-left: 3%;
    margin-top: 2%;
}
.wall {
    width: 60%;
    height: auto;
    margin: auto;
    margin-bottom: 30px;
    background-color: white;
    border-radius: 20px;
    padding: 20px;
}
.publication {
    display: flex;
    flex-direction: column;
}
.title {
    width: 35%;
}
.content {
    width: auto;
}
.publication-button {
    display: flex;
}
</style>
