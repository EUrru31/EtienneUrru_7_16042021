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
                                <a @click.prevent="logout()" class="button"
                                    >Déconnexion</a
                                >
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
        <div class="card">
            <h1 class="card__title">Mon profil</h1>
            <img :src="user.photo" />
            <p class="card__profile">{{ nom }} {{ prenom }}</p>
            <p class="card__profile">{{ email }}</p>
            <button @click.prevent="deleteAccount()" class="button__delete">
                Supprimer le compte
            </button>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
const axios = require("axios");
export default {
    name: "Profile",

    data: function() {
        return {
            nom: "",
            prenom: "",
            email: "",
        };
    },

    mounted: function() {
        if (this.$store.state.user.userId == -1) {
            this.$router.push("/profile");
            return;
        }
        this.nom = this.$store.state.user.user.nom;
        this.prenom = this.$store.state.user.user.prenom;
        this.email = this.$store.state.user.user.email;
    },

    computed: {
        ...mapState({
            user: "userInfos",
        }),
    },
    methods: {
        getUserInfos() {
            axios
                .get("http://localhost:3000/api/auth/:userId")
                .then((reponse) => (this.users = reponse.data));
        },
        deleteAccount: async function() {
            const self = this;
            this.$store.dispatch("deleteAccount", this.user).then(
                function() {
                    self.$router.push("/");
                },
                function(error) {
                    console.log(error);
                }
            );
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

.logo {
    width: 400px;
    margin-left: 3%;
    margin-top: 2%;
}

.card__profile {
    display: flex;
    flex-direction: column;
}
</style>
