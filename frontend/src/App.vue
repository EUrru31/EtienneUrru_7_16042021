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
.login_header {
    text-align: center;
    margin-top: 100px;
    margin-bottom: 100px;
}

h1 {
    color: red;
}

.card {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgb(209, 209, 209);
    border-radius: 20px;
    width: 400px;
    margin: auto;
    margin-top: 50px;
}

.inputs {
    display: flex;
    flex-direction: column;
}

.input {
    border: 1px solid rgb(153, 153, 153);
    border-radius: 5px;
    margin: 5px;
    padding: 5px;
    width: 250px;
}

.button {
    border: 1px solid black;
    border-radius: 10px;
    padding: 5px;
    background-color: rgb(236, 124, 124);
    font-weight: bold;
}
</style>
