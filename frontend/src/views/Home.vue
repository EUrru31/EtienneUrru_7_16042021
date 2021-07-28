<template>
    <div>
        <h1>Page d'acceuil</h1>
        <nav class="nav-bar">
            <NavLink url="/Home" text="Accueil" />
            <NavLink url="/Profile" text="Mon profil" />
            <button>Deconnexion</button>
        </nav>
        <img class="logo" alt="logo groupomania" src="icon-above-font.svg" />
        <modal>
            <form>
                <input
                    v-model="title"
                    class="input"
                    autocomplete="text"
                    placeholder="Titre"
                />
                <input
                    v-model="content"
                    class="input"
                    autocomplete="text"
                    placeholder="Contenu"
                />
            </form>
            <button v-on:click="createPost()">Publier</button>
        </modal>

        <template v-for="post in posts" class="card_field">
            <p :key="post.id">{{ post.userId.nom }}{{ post.userId.prenom }}</p>
            <h3 :key="post.id">{{ post.title }}</h3>
            <p :key="post.id">{{ post.content }}</p>
            <div class="like" :key="post.id">
                <i class="far fa-heart fa-lg"></i>
                <i class="fas fa-heart"></i>
            </div>
        </template>
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
    },
};
</script>

<style scoped></style>
