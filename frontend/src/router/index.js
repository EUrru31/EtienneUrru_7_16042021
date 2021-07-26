import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login.vue";
import NotFound from "@/views/NotFound.vue";
import Profile from "@/views/Profile.vue";
import Home from "@/views/Home.vue";

const routes = [
    {
        name: "Login",
        path: "/",
        component: Login,
        meta: {
            title: "Connexion",
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
    {
        name: "Profile",
        path: "/profile",
        component: Profile,
        props: true,
        meta: {
            title: "Profile",
        },
    },
    {
        name: "Home",
        path: "/home",
        component: Home,
        meta: {
            title: "Home",
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
