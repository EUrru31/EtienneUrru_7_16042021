<template>
    <div class="posts">
        <div class="postIcon">
            <div class="post">
                <h3>{{ postData.title }}</h3>
                <p>{{ postData.text }}</p>
            </div>
            <div class="icons">
                <div v-if="isEditable" @click.prevent="editPost()">
                    <i class="fas fa-edit"></i>
                </div>
                <div v-if="isLikable" @click.prevent="likePost()">
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
            user: {},
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
            if (this.$store.state.user.isAdmin === 1) {
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
        editPost() {
            console.log("post edité");
        },
        likePost() {
            console.log("post liké");
        },
        commentPost() {
            console.log("post commenté");
        },
        deletePost() {
            console.log("post supprimé");
        },
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
    border-radius: 20px;
    border: 0.1px solid;
    background-color: rgb(201, 200, 200);
    height: 30px;
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
