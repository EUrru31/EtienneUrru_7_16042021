<template>
    <router-view>
        <h1 class="title">GROUPOMANIA</h1>
        <p>Bienvenue sur le réseau social de Groupomania</p>
        <nav>
            <router-link to="/">Connexion</router-link>
            <router-link to="/signin">Inscription</router-link>
        </nav>
    </router-view>
</template>

<script>
export default {
    name: "App",
    components: {},
};
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

a {
    text-decoration: none;
    color: #999;
}

.router-link-active {
    font-weight: bold;
    color: red;
    margin: 15px;
}

.title {
    color: red;
}
</style>
