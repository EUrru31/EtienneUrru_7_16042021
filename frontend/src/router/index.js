import { createRouter, createWebHashHistory } from "vue-router";
import Login from "@/views/Login.vue";
import Profile from "@/views/Profile.vue";
import Home from "@/views/Home.vue";

const routes = [
    {
        name: "Login",
        path: "/",
        component: Login,
    },
    {
        name: "Profile",
        path: "/",
        component: Profile,
    },
    {
        name: "Home",
        path: "/",
        component: Home,
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
