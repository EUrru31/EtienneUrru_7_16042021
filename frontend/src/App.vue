<template>
    <nav>
        <router-link to="/">Connexion</router-link>
        <router-link to="/signin">Inscription</router-link>
    </nav>
    <router-view />
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
</style>
