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
        <div>
            <input
                class="input content"
                autocomplete="text"
                placeholder="Commentaire"
            />
            <button>Commentez</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "Post",

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
i {
    cursor: pointer;
    margin: 10px;
}
.icons {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
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
