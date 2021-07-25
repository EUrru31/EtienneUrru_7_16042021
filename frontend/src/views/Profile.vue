<template>
    <div class="card">
        <h4>Mon Profil</h4>

        <div class="form-row">
            <p>Nom</p>
            <p>Prénom</p>
        </div>
        <div class="form-row">
            <p>Adresse mail</p>
        </div>
        <div class="form-row">
            <button class="button">Déconnection</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "Profile",
};
</script>

<style lang="scss" scoped>
.card {
    border: 1px solid black;
    border-radius: 20px;
    width: 400px;
    margin: auto;
    margin-top: 50px;
    padding-bottom: 20px;
}

button {
    border: 1px solid rgb(153, 153, 153);
    border-radius: 5px;
    margin: 20px;
}
</style>
