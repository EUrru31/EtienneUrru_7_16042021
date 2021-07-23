<template>
    <div class="card">
        <h4>Veuillez remplir le formulaire d'inscription:</h4>
        <div class="form-row">
            <input class="form-row_input" type="text" placeholder="Nom" />
            <input class="form-row_input" type="text" placeholder="Prénom" />
        </div>
        <div class="form-row">
            <input
                class="form-row_input"
                type="email"
                placeholder="Adresse mail"
            />
        </div>
        <div class="form-row">
            <input
                class="form-row_input"
                type="password"
                placeholder="Mot de passe"
            />
        </div>
        <div class="form-row">
            <button class="button">Inscription</button>
        </div>
    </div>
</template>

<script></script>

<style lang="scss" scoped>
.card {
    border: 1px solid black;
    border-radius: 20px;
    width: 400px;
    margin: auto;
    margin-top: 50px;
    padding-bottom: 20px;
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
