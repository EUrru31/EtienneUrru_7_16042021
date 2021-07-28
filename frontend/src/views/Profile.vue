<template>
    <div>
        <div class="header">
            <img
                class="logo"
                alt="logo groupomania"
                src="icon-above-font.svg"
            />
        </div>
        <nav class="navbar navbar-expand navbar-light fixed-top">
            <div class="container">
                <a href="/home" class="navbar-brand">Acceuil</a>
                <div class="collapse navbar-collapse">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <a href="/profile" class="nav-link">Mon Profil</a>
                        </li>
                        <li class="nav-item">
                            <a @click="logout()" class="button">Déconnexion</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div class="card">
            <h1 class="card__title">Mon profil</h1>
            <p>{{ user.prenom }} {{ user.nom }} {{ user.email }}</p>
            <div class="form-row">
                <button @click="logout()" class="button">
                    Déconnexion
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    name: "Profile",

    mounted: function() {
        if (this.$store.state.user.userId == -1) {
            this.$router.push("/profile");
            return;
        }
        this.$store.dispatch("getUserInfos");
    },
    computed: {
        ...mapState({
            user: "userInfos",
        }),
    },
    methods: {
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
}
h1 {
    margin: auto;
}</style
>>
