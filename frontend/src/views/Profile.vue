<template>
    <div class="card">
        <h1 class="card__title">Mon profil</h1>
        <p>{{ user.prenom }} {{ user.nom }} {{ user.email }}</p>
        <div class="form-row">
            <button @click="logout()" class="button">
                Déconnexion
            </button>
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
        logout: function() {
            this.$store.commit("logout");
            this.$router.push("/");
        },
    },
};
</script>

<style scoped></style>>
