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
body {
    background-image: url(./assets/fond.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    font-family: Verdana, Tahoma, sans-serif;
}
.login_header {
    text-align: center;
    margin-top: 100px;
    margin-bottom: 70px;
    font-size: 2rem;
    font-weight: bold;
}

.logo {
    margin-bottom: 50px;
    width: 30%;
    max-width: 300px;
    margin-top: 10px;
    margin-left: 30px;
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
    padding: 30px;
}

.card__subtitle {
    margin-top: 35px;
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
    border: 1px solid rgb(145, 100, 100);
    border-radius: 10px;
    margin-top: 10px;
    padding: 5px;
    background-color: rgb(236, 124, 124);
    font-weight: bold;
    cursor: pointer;
}

.button-switch {
    border: 0.5px solid rgb(173, 173, 173);
    border-radius: 10px;
    padding: 5px;
    background-color: rgb(173, 173, 173);
}
@media (max-width: 1000px) {
    body {
        height: 1000px;
    }
    .logo {
        width: 80%;
        margin-bottom: 10px;
        margin: auto;
    }
    .card {
        width: 80%;
    }
    .login_header {
        margin-top: 40px;
        margin-bottom: 20px;
    }
}
</style>
