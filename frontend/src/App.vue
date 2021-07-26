<template>
    <router-view></router-view>
</template>

<script>
export default {
    name: "App",
    components: {},
};
</script>

<style>
.card {
    background-color: rgb(209, 209, 209);
    border-radius: 20px;
    width: 400px;
    margin: auto;
    margin-top: 50px;
    padding: 30px;
}

.card__action {
    border: 1px solid black;
    border-radius: 10px;
    padding: 5px;
    background-color: rgb(236, 124, 124);
    font-weight: bold;
}

input {
    border: 1px solid rgb(153, 153, 153);
    border-radius: 5px;
    margin: 5px;
    padding: 5px;
    width: 70%;
}

button {
    border: 1px solid rgb(153, 153, 153);
    border-radius: 5px;
    margin: 20px;
}
</style>
