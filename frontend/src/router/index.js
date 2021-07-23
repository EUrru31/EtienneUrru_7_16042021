import { createRouter, createWebHistory } from "vue-router";
import Connect from "@/views/Connect.vue";
import Signin from "@/views/Signin.vue";

const routes = [
    {
        name: "Connect",
        path: "/",
        component: Connect,
    },
    {
        name: "Signin",
        path: "/signin",
        component: Signin,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
