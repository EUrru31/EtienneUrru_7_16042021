<template>
    <div class="header">
        <img
            class="logo"
            alt="logo groupomania"
            src="../assets/icon-left-font-monochrome-black.svg"
        />
        <nav class="navbar navbar-expand navbar-light fixed-top">
            <div class="container">
                <div class="collapse navbar-collapse">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <a href="/home" class="navbar-brand">Acceuil</a>
                        </li>
                        <li class="nav-item">
                            <a href="/profile" class="nav-link">Mon Profil</a>
                        </li>
                        <li class="nav-item">
                            <a @click="logout()" class="button">Déconnexion</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>
<script>
export default {
    name: "Header",
};
</script>
<style lang="scss" scoped>
.navbar-nav {
    display: flex;
    justify-content: flex-end;
    margin-right: 40px;
    text-decoration: none;
    list-style-type: none;
}
.nav-item {
    margin-right: 40px;
}
a {
    text-decoration: none;
    color: black;
}
.header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
</style>
