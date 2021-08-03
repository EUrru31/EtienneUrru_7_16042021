<template>
    <div class="posts">
        <div class="post__icon">
            <div v-if="!isEditMode" class="post">
                <h4>{{ nom }} {{ prenom }}</h4>

                <p class="text__post">{{ postData.text }}</p>
            </div>

            <div class="icons">
                <div @click.prevent="commentPost()">
                    <i class="fas fa-comment-alt"></i>
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
            <h4 class="title__comments">Commentaire(s)</h4>
            <div class="comments" v-for="comment in comments" :key="comment.id">
                <div>
                    <span class="nom__comments"
                        >{{ comment.name }} {{ comment.firstName }}</span
                    >
                    <span class="text__comments">{{ comment.text }}</span>
                </div>
                <div v-if="isDeletable" @click.prevent="deleteComment()">
                    <i class="fas fa-trash"></i>
                </div>
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
        isDeletable() {
            if (this.$store.state.user.admin === 1) {
                return true;
            }
            if (this.postData.user_id === this.$store.state.user.id) {
                return true;
            }
            return false;
        },
    },
    methods: {
        async processComments(comments) {
            const finalComments = [];
            for (const comment of comments) {
                const user = await instance.get(
                    `/api/auth/users/id/${comment.user_id}`
                );
                finalComments.push({
                    ...comment,
                    name: user.data.nom,
                    firstName: user.data.prenom,
                });
            }
            return finalComments;
        },
        updateComment() {
            axios
                .get("http://localhost:3000/comments/")
                .then(
                    async (response) =>
                        (this.comments = await this.processComments(
                            response.data
                        ))
                );
        },
        async createComment() {
            instance.post("/comments/", {
                text: this.comment,
                user_id: this.$store.state.user.user.id,
                posts_id: this.postData.id,
            });
            await this.$store.dispatch("getAllComments", this.postData.id);
            this.comments = await this.processComments(
                this.$store.state.comments
            );
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

        commentPost() {
            this.showComments = !this.showComments;
        },
        async deletePost() {
            await instance.delete(`/posts/${this.postData.id}`);
            this.$store.state.posts = this.$store.state.posts.filter(
                (elem) => elem.id !== this.postData.id
            );
        },
        async deleteComment() {
            await instance.delete(`/comments/${this.$store.state.comments}`);
            this.$store.state.comments = this.$store.state.comments.filter(
                (elem) => elem.id !== this.this.$store.state.comments
            );
        },
    },
    async mounted() {
        const user = await instance.get(
            `/api/auth/users/id/${this.postData.user_id}`
        );
        this.nom = user.data.nom;
        this.prenom = user.data.prenom;

        const comments = (
            await instance.get(`/comments/postid/${this.postData.id}`)
        ).data;

        this.comments = await this.processComments(comments);
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
.comments {
    display: flex;
    justify-content: space-between;
}

h4 {
    font-size: 0.9rem;
    margin: 10px;
}

.text__post {
    font-size: 0.8rem;
    margin: 10px;
}

i {
    cursor: pointer;
    margin: 10px;
}
.icons {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    color: rgb(252, 101, 101);
}
.post_icon {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.post {
    display: flex;
    flex-direction: column;
}
.title__comments {
    text-decoration: underline;
}
.comments {
    margin: 15px;
}
.nom__comments {
    display: flex;
    font-weight: bold;
    margin-bottom: 5px;
    font-size: 0.8rem;
}
.text__comments {
    font-size: 0.8rem;
}
@media (max-width: 1000px) {
    .post_icon {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .publication {
        display: flex;
        flex-direction: column;
    }
    .input {
        width: 80%;
    }
}
</style>
