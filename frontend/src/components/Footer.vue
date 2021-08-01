<template>
    <div class="footer">
        <ul>
            <li>Groupomania.com</li>
            <li>Contactez-nous</li>
            <li>Services techniques</li>
        </ul>
    </div>
</template>
<script>
export default {
    name: "Footer",
};
</script>
<style scoped>
ul {
    display: flex;
    justify-content: space-around;
    margin-top: 50px;
    margin-bottom: 50px;
    list-style: none;
    font-weight: bold;
}
@media (max-width: 1000px) {
    ul {
        display: flex;
        align-items: center;
        flex-direction: column;
        margin-left: -40px;
    }
}
</style>
