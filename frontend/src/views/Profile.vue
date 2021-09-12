<template>
    <div>
        <Header />
        <div class="card">
            <h1 class="card__title">Mon profil</h1>
            <img :src="user.photo" />
            <p class="card__profile">
                Nom: <span>{{ nom }}</span>
            </p>
            <p class="card__profile">
                Prenom: <span>{{ prenom }}</span>
            </p>
            <p class="card__profile">
                Email: <span>{{ email }}</span>
            </p>
            <button @click.prevent="deleteAccount()" class="button__delete">
                Supprimer le compte
            </button>
        </div>
        <Footer />
    </div>
</template>

<script>
import Header from "../components/Header";
import Footer from "../components/Footer";
import { mapState } from "vuex";
const axios = require("axios");
export default {
    name: "Profile",
    components: { Footer, Header },
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
            var res = confirm("Êtes-vous sûr de vouloir supprimer?");
            if (res) {
                const self = this;
                this.$store.dispatch("deleteAccount", this.user).then(
                    function() {
                        self.$router.push("/");
                    },
                    function(error) {
                        console.log(error);
                    }
                );
            }
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

.card__profile {
    display: flex;
    flex-direction: row;
}
.button__delete {
    background-color: rgb(255, 70, 70);
    border-radius: 20px;
    border: 1px solid rgb(255, 70, 70);
    margin-top: 30px;
    padding: 5px;
}
span {
    font-weight: bold;
    margin-left: 15px;
}

@media (max-width: 1000px) {
    .card {
        font-size: 0.8rem;
    }
}
</style>
