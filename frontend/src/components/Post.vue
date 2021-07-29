<template>
    <div>
        <h3>{{ postData.title }}</h3>
        <p>{{ postData.text }}</p>
        <div v-if="isEditable" @click.prevent="editPost()">
            <i class="fas fa-edit"></i>
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
    },
    methods: {
        editPost() {
            console.log("coucou");
        },
    },
    mounted() {},
};
</script>

<style scoped></style>
