import { createRouter, createWebHistory } from "vue-router";
import Connect from "@/views/Connect.vue";
import Signin from "@/views/Signin.vue";
import NotFound from "@/views/NotFound.vue";

const routes = [
    {
        name: "Connect",
        path: "/",
        component: Connect,
        meta: {
            title: "Connexion",
        },
    },
    {
        name: "Signin",
        path: "/signin",
        component: Signin,
        meta: {
            title: "Inscription",
        },
    },
    {
        name: "NotFound",
        path: "/:pathMatch(.*)",
        component: NotFound,
        meta: {
            title: "404 Not Found",
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.afterEach((to) => {
    document.title = to.meta.title;
});

export default router;
