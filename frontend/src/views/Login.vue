<template>
    <div>
        <div class="login_header">
            <img
                class="logo"
                alt="logo groupomania"
                src="../assets/icon-left-font-monochrome-black.svg"
            />
            <p>Bienvenue dans le reseau social de Groupomania</p>
        </div>
        <div class="card">
            <h1 class="card__title" v-if="mode == 'login'">Connexion</h1>
            <h1 class="card__title" v-else>Inscription</h1>

            <div v-if="mode == 'create'">
                <form class="inputs">
                    <input
                        v-model="prenom"
                        class="input"
                        autocomplete="text"
                        placeholder="Prénom"
                    />
                    <input
                        v-model="nom"
                        class="input"
                        autocomplete="text"
                        placeholder="Nom"
                    />
                    <input
                        v-model="email"
                        class="input"
                        autocomplete="email"
                        placeholder="Adresse mail"
                    />
                    <input
                        v-model="password"
                        class="input"
                        autocomplete="password"
                        placeholder="Mot de passe"
                    />
                </form>
            </div>

            <div v-if="mode == 'login'">
                <form class="inputs">
                    <input
                        v-model="email"
                        class="input"
                        autocomplete="text"
                        placeholder="Adresse mail"
                    />
                    <input
                        v-model="password"
                        type="password"
                        class="input"
                        autocomplete="password"
                        placeholder="Mot de passe"
                    />
                </form>
            </div>
            <div
                class="form-row"
                v-if="mode == 'login' && status == 'error_login'"
            >
                Identifiants de connexion invalide
            </div>
            <div class="form-row" v-if="mode == 'create' && email == 'email'">
                <!-- Si email déja utiliser !!!!!!! A MODIFIER !!!!!!!!!!!!!-->
                Email déjà utilisée, connectez-vous !
            </div>
            <div
                class="form-row"
                v-if="
                    (mode == 'create' && email == null) ||
                        nom == null ||
                        prenom == null ||
                        password == null
                "
            >
                Merci de remplir les champs !
            </div>
            <div class="form-row">
                <button
                    @click="login()"
                    class="button"
                    :class="{ 'button--disabled': !validatedFields }"
                    v-if="mode == 'login'"
                >
                    <span v-if="status == 'loading'"
                        >Connexion en cours...</span
                    >
                    <span v-else>Connexion</span>
                </button>
                <button
                    @click="createAccount()"
                    class="button"
                    :class="{ 'button--disabled': !validatedFields }"
                    v-else
                >
                    <span v-if="status == 'loading'">Création en cours...</span>
                    <span v-else>Créer mon compte</span>
                </button>
            </div>
            <div class="card__subtitle" v-if="mode == 'login'">
                <p class="card__subtitle-text">Si c'est ta première visite,</p>
                <span class="button-switch" @click="switchToCreateAccount()"
                    >Créer un compte</span
                >
            </div>
            <div class="card__subtitle" v-else>
                <p class="card__subtitle-text">
                    Tu fais déja partie du réseau,
                </p>
                <span class="button-switch" @click="switchToLogin()"
                    >Se connecter</span
                >
            </div>
        </div>
        <Footer />
    </div>
</template>

<script>
import Footer from "../components/Footer";
import { mapState } from "vuex";
export default {
    name: "Login",
    components: { Footer },
    data: function() {
        return {
            mode: "login",
            email: "",
            prenom: "",
            nom: "",
            password: "",
            isAdmin: "",
        };
    },
    mounted: function() {
        if (this.$store.state.user.userId != -1) {
            this.$router.push("/");
            return;
        }
    },
    computed: {
        validatedFields: function() {
            if (this.mode == "create") {
                if (
                    this.email != "" &&
                    this.prenom != "" &&
                    this.nom != "" &&
                    this.password != "" &&
                    this.isAdmin != "0"
                ) {
                    return true;
                } else {
                    return false;
                }
            } else {
                if (this.email != "" && this.password != "") {
                    return true;
                } else {
                    return false;
                }
            }
        },
        ...mapState(["status"]),
    },
    methods: {
        switchToCreateAccount: function() {
            this.mode = "create";
        },
        switchToLogin: function() {
            this.mode = "login";
        },
        login: async function() {
            const self = this;

            this.$store
                .dispatch("login", {
                    email: this.email,
                    password: this.password,
                })
                .then(
                    function() {
                        self.$router.push("/Home");
                    },
                    function(error) {
                        console.log(error);
                    }
                );
        },
        createAccount: async function() {
            await this.$store
                .dispatch("createAccount", {
                    email: this.email,
                    nom: this.nom,
                    prenom: this.prenom,
                    password: this.password,
                    isAdmin: this.isAdmin,
                })
                .then(
                    function() {},
                    function(error) {
                        console.log(error);
                    }
                );
            await this.login();
        },
    },
};
</script>

<style scoped>
@media (max-width: 1000px) {
    .card__subtitle {
        display: flex;
        flex-direction: column;
    }
    .card__subtitle-text {
        font-size: 0.8rem;
    }
}
</style>
