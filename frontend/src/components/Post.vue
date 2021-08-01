<template>
    <div class="posts">
        <div class="postIcon">
            <div v-if="!isEditMode" class="post">
                <h4>{{ nom }} {{ prenom }}</h4>

                <p>{{ postData.text }}</p>
            </div>
            <div v-if="isEditMode">
                <input
                    v-model="newContent"
                    class="input content"
                    autocomplete="text"
                    placeholder="Contenu"
                />
                <button v-on:click="updatePost()">Modifier</button>
            </div>
            <div class="icons">
                <div id="likes" @click.prevent="likePost()">
                    <i class="fas fa-heart"></i>
                </div>
                <div @click.prevent="commentPost()">
                    <i class="fas fa-comment-alt"></i>
                </div>
                <div
                    v-if="isEditable"
                    @click="isEditMode = true"
                    @click.prevent="editPost()"
                >
                    <i class="fas fa-edit"></i>
                </div>
                <div v-if="isDeletable" @click.prevent="deletePost()">
                    <i class="fas fa-trash"></i>
                </div>
            </div>
        </div>

        <div v-if="showComments">
            <div class="publication">
                <form>
                    <input
                        v-model="comment"
                        class="input comment"
                        autocomplete="text"
                        placeholder="Commentaire"
                    />
                </form>
                <button class="publication-button" v-on:click="createComment()">
                    Commenter
                </button>
            </div>
            <h4>Commentaire(s)</h4>
            <div v-for="comment in comments" :key="comment.id">
                <span class="nom__comments">Nom Prenom</span>
                {{ comment.text }}
            </div>
        </div>
        <hr />
    </div>
</template>

<script>
const axios = require("axios");

const instance = axios.create({
    baseURL: "http://localhost:3000/",
});
export default {
    name: "Post",
    data: function() {
        return {
            comments: [],
            comment: "",
            nom: "",
            prenom: "",

            newContent: "",
            showComments: false,
            user: {},
            isEditMode: false,
        };
    },

    props: {
        postData: {
            type: Object,
            required: true,
        },
    },
    computed: {
        isEditable() {
            if (this.postData.user_id === this.$store.state.user.user.id) {
                return true;
            }
            return false;
        },
        isDeletable() {
            console.log(this.$store.state.user.user);
            if (this.$store.state.user.user.admin === 1) {
                return true;
            }
            if (this.postData.user_id === this.$store.state.user.user.id) {
                return true;
            }
            return false;
        },
    },
    methods: {
        async createComment() {
            instance.post("/comments/", {
                text: this.comment,
                user_id: this.$store.state.user.user.id,
                posts_id: this.postData.id,
            });
            await this.$store.dispatch("getAllComments");
            this.comments = this.$store.state.comments;
        },
        async updatePost() {
            await instance.put(`/posts/${this.postData.id}`),
                {
                    text: this.newContent,
                    user_id: this.$store.state.user.user.id,
                };

            await this.$store.dispatch("getAllPosts");
            this.posts = this.$store.state.posts;
        },
        likePost() {
            // document.getElementById(
            //     "like"
            // ).innerText = this.$store.state.likes.length;
        },
        commentPost() {
            this.showComments = !this.showComments;
        },
        async deletePost() {
            console.log("coucou");
            await instance.delete(`/posts/${this.postData.id}`);
            this.$store.state.posts = this.$store.state.posts.filter(
                (elem) => elem.id !== this.postData.id
            );
        },
    },
    async mounted() {
        const user = await instance.get(
            `/api/auth/users/id/${this.postData.user_id}`
        );

        this.nom = user.data.nom;
        this.prenom = user.data.prenom;

        this.comments = (
            await instance.get(`/comments/postid/${this.postData.id}`)
        ).data;
        console.log(this.comments);
    },
};
</script>

<style scoped>
.publication {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.publication-button {
    border-radius: 10px;
    border: 0.1px solid rgb(179, 179, 179);
    background-color: rgb(228, 228, 228);
    height: 25px;
}
.comment {
    width: auto;
    margin-bottom: 20px;
}

i {
    cursor: pointer;
    margin: 10px;
}
.icons {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    color: red;
}
.postIcon {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.post {
    display: flex;
    flex-direction: column;
}
.nom__comments {
    display: flex;
    font-weight: bold;
    margin-bottom: 5px;
}
</style>
