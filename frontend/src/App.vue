<template>
    <nav id="nav">
        <router-link to="/">Acceuil</router-link>
        <router-link to="/Profile">Mon Profil</router-link>
    </nav>
</template>

<script>
export default {
    name: "App",
    components: {},
};
</script>

<style scoped>
#nav {
    display: flex;
    justify-content: flex-end;
}
</style>
