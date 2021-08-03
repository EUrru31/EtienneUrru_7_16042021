<template>
    <div>
        <Header />
        <div class="wall">
            <form class="publication">
                <input
                    v-model="content"
                    id="cform"
                    type="textarea"
                    class="input content"
                    autocomplete="text"
                    placeholder="Contenu"
                />
            </form>
            <div class="submit__publication">
                <!-- <input type="file" @change="uploadImage()" id="file-input" /> -->
                <button class="publication-button" v-on:click="createPost()">
                    Publier
                </button>
            </div>
        </div>
        <div class="wall">
            <h4>Dernières publications</h4>
            <Post v-for="post in postsArray" :key="post.id" :postData="post" />
        </div>
        <Footer />
    </div>
</template>

<script>
import Header from "../components/Header";
import Post from "../components/Post";
import Footer from "../components/Footer";
const axios = require("axios");
export default {
    name: "Home",
    components: { Post, Footer, Header },
    data: function() {
        return {
            posts: [],
            nom: "",
            prenom: "",

            content: "",
            user: {},
        };
    },
    async mounted() {
        await this.$store.dispatch("getAllPosts");
    },
    methods: {
        updatePost() {
            axios
                .get("http://localhost:3000/posts/")
                .then((reponse) => (this.posts = reponse.data));
        },
        async createPost() {
            this.$store

                .dispatch("createPost", {
                    text: this.content,
                    user_id: this.$store.state.user.user.id,
                })
                .then(
                    function(response) {
                        console.log(response);
                    },
                    function(error) {
                        console.log(error);
                    }
                );
            await this.$store.dispatch("getAllPosts");
        },
        async logout() {
            await this.$store.dispatch("logout");
            this.$router.push("/");
        },
    },
    computed: {
        postsArray() {
            return this.$store.state.posts;
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

.submit__publication {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
}
h1 {
    margin: auto;
}
h4 {
    text-decoration: underline;
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
    background-color: rgb(255, 255, 255);
    box-shadow: 1px 2px 2px rgb(255, 60, 60);
    border-radius: 5px;
    padding: 20px;
}
.publication {
    display: flex;
    flex-direction: column;
}
.publication-button {
    border-radius: 10px;
    border: 0.1px solid rgb(179, 179, 179);
    background-color: rgb(228, 228, 228);
    height: 25px;
}

.content {
    width: auto;
}
@media (max-width: 1000px) {
    .submit__publication {
        display: flex;
        flex-direction: column;
    }
    .publication-button {
        margin-top: 10px;
        align-self: center;
    }
}
</style>
