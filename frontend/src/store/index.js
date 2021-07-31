import { createStore } from "vuex";
import "es6-promise/auto";
const axios = require("axios");

const instance = axios.create({
    baseURL: "http://localhost:3000/",
});

let user = localStorage.getItem("user");
if (!user) {
    user = {
        userId: -1,
        token: "",
    };
} else {
    try {
        user = JSON.parse(user);
        instance.defaults.headers.common["Authorization"] = user.token;
    } catch (ex) {
        user = {
            userId: -1,
            token: "",
        };
    }
}

// Create a new store instance.
const store = createStore({
    state: {
        status: "",
        user: user,
        userInfos: {
            nom: "",
            prenom: "",
            email: "",
            isAdmin: 0,
            id: -1,
        },
        commentInfos: {
            userId: "",
            postId: "",
            text: "",
        },
    },
    mutations: {
        setStatus: function(state, status) {
            state.status = status;
        },
        logUser: function(state, user) {
            instance.defaults.headers.common["Authorization"] = user.token;
            localStorage.setItem("user", JSON.stringify(user));
            state.user = user.user;
        },
        userInfos: function(state, userInfos) {
            state.userInfos = userInfos;
        },
        logout: function(state) {
            state.user = {
                userId: -1,
                token: "",
            };
            localStorage.removeItem("user");
        },
        fillPosts: function(state, posts) {
            state.posts = posts;
        },
        fillComments: function(state, comments) {
            state.comments = comments;
        },
    },
    actions: {
        login: ({ commit }, userInfos) => {
            commit("setStatus", "loading");
            return new Promise((resolve, reject) => {
                instance
                    .post("/api/auth/login", userInfos)
                    .then(function(response) {
                        commit("setStatus", "");
                        commit("logUser", response.data);
                        resolve(response);
                    })
                    .catch(function(error) {
                        console.log(error);
                        commit("setStatus", "error_login");
                        reject(error);
                    });
            });
        },
        createAccount: ({ commit }, userInfos) => {
            commit("setStatus", "loading");
            return new Promise((resolve, reject) => {
                commit;
                instance
                    .post("/api/auth/signup", userInfos)
                    .then(function(response) {
                        commit("setStatus", "created");

                        resolve(response);
                    })
                    .catch(function(error) {
                        commit("setStatus", "error_create");
                        reject(error);
                    });
            });
        },
        getUserInfos: ({ userId }) => {
            console.log("eee", userId);
            instance
                .get(`/api/auth/users/${userId}`, userId)
                .then(function(response) {
                    return response.data;
                })
                .catch(function() {});
        },
        deleteAccount: ({ commit }) => {
            console.log(user.user);
            commit("setStatus", "loading");
            return new Promise((resolve, reject) => {
                commit;
                instance
                    .delete(`/api/auth/users/${user.user.id}`, user.user)
                    .then(function(response) {
                        commit("logout");
                        resolve(response);
                    })
                    .catch(function(error) {
                        commit("setStatus", "error_create");
                        reject(error);
                    });
            });
        },
        createPost: ({ commit }, postInfos) => {
            commit("setStatus", "loading");
            return new Promise((resolve, reject) => {
                commit;
                instance
                    .post("/posts/", postInfos)
                    .then(function(response) {
                        commit("setStatus", "created");
                        resolve(response);
                    })
                    .catch(function(error) {
                        commit("setStatus", "error_create");
                        reject(error);
                    });
            });
        },
        updatePost: ({ commit }, postInfos) => {
            commit("setStatus", "loading");
            return new Promise((resolve, reject) => {
                commit;
                instance
                    .put("/posts/", postInfos)
                    .then(function(response) {
                        commit("setStatus", "created");
                        resolve(response);
                    })
                    .catch(function(error) {
                        commit("setStatus", "error_create");
                        reject(error);
                    });
            });
        },
        getAllPosts: ({ commit }) => {
            return new Promise((resolve, reject) => {
                commit;
                instance
                    .get("/posts/")
                    .then(function(response) {
                        commit("fillPosts", response.data);
                        resolve(response);
                    })
                    .catch(function(error) {
                        commit("setStatus", "error_create");
                        reject(error);
                    });
            });
        },
        createComment: ({ commit }, commentInfos) => {
            console.log(commentInfos);
            commit("setStatus", "loading");
            return new Promise((resolve, reject) => {
                commit;
                instance
                    .post("/comments/", {
                        text: commentInfos.text,
                        user_id: commentInfos.userId,
                        post_id: commentInfos.postId,
                    })
                    .then(function(response) {
                        commit("setStatus", "created");
                        resolve(response);
                    })
                    .catch(function(error) {
                        commit("setStatus", "error_create");
                        reject(error);
                    });
            });
        },
        getAllComments: ({ commit }) => {
            return new Promise((resolve, reject) => {
                commit;
                instance
                    .get("/comments/")
                    .then(function(response) {
                        commit("fillComments", response.data);
                        resolve(response);
                    })
                    .catch(function(error) {
                        commit("setStatus", "error_create");
                        reject(error);
                    });
            });
        },
        logout: ({ commit }) => {
            commit("logout");
        },
    },
});

export default store;
