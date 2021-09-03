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
            description: "Page de connexion réseau social Groupomania",
        },
    },

    {
        name: "NotFound",
        path: "/:pathMatch(.*)",
        component: NotFound,
        meta: {
            title: "404 Not Found",
            description: "Page non trouvé réseau social Groupomania",
        },
    },
    {
        name: "Profile",
        path: "/profile",
        component: Profile,
        meta: {
            title: "Profile",
            description: "Page de profil utilisateur réseau social Groupomania",
        },
    },
    {
        name: "Home",
        path: "/home",
        component: Home,
        meta: {
            title: "Home",
            description: "Page d'acceuil réseau social Groupomania",
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
