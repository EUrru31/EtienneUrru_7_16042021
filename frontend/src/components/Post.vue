<template>
    <div class="posts">
        <div class="postIcon">
            <div v-if="!isEditMode" class="post">
                <h4>{{ postData.user_id.nom }}{{ postData.user_id.prenom }}</h4>
                <h5>{{ postData.title }}</h5>
                <p>{{ postData.text }}</p>
            </div>
            <div v-if="isEditMode">
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
                <button v-on:click="updatePost()">Modifier</button>
            </div>
            <div class="icons">
                <div
                    v-if="isEditable"
                    @click="isEditMode = true"
                    @click.prevent="editPost()"
                >
                    <i class="fas fa-edit"></i>
                </div>
                <div id="likes" v-if="isLikable" @click.prevent="likePost()">
                    <i class="fas fa-heart"></i>
                </div>
                <div v-if="isCommentable" @click.prevent="commentPost()">
                    <i class="fas fa-comment-alt"></i>
                </div>
                <div v-if="isDeletable" @click.prevent="deletePost()">
                    <i class="fas fa-trash"></i>
                </div>
            </div>
        </div>
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
        <hr />
    </div>
</template>

<script>
export default {
    name: "Post",
    data: function() {
        return {
            comments: [],
            comment: "",
            nom: "",
            prenom: "",
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
            if (this.$store.state.user.admin === true) {
                return true;
            }
            if (this.postData.user_id === this.$store.state.user.user.id) {
                return true;
            }
            return false;
        },
        isLikable() {
            if (this.$store.state.user.isAdmin === 1) {
                return true;
            }
            if (this.postData.user_id === this.$store.state.user.user.id) {
                return true;
            }
            return false;
        },
        isCommentable() {
            if (this.$store.state.user.isAdmin === 1) {
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
            this.$store

                .dispatch("createComment", {
                    comment: this.comment,
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
            await this.$store.dispatch("getAllComments");
            this.comments = this.$store.state.comments;
        },
        async updatePost() {
            this.$store

                .dispatch("updatePost", {
                    title: this.title,
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
            this.posts = this.$store.state.posts;
        },
        likePost() {
            document.getElementById(
                "like"
            ).innerText = this.$store.state.likes.length;
        },
        commentPost() {
            console.log("post commenté");
        },
        deletePost() {
            console.log("post supprimé");
        },
        postliked() {},
    },
    mounted() {},
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
</style>
