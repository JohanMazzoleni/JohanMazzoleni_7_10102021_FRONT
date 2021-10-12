import { createApp } from "vue";
import App from "./App.vue";
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import jwt from 'jsonwebtoken';

import TimeAgo from "javascript-time-ago";
import fr from "javascript-time-ago/locale/fr.json";
TimeAgo.addDefaultLocale(fr);

const app = createApp(App);

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (error && error.response && error.response.data && error.response.data.status == "bad_token") {
        localStorage.removeItem("token");
        router.push({ name: "Login" });
    }
    return Promise.reject(error);
});

let getInfo = function () {
    var user = localStorage.getItem("token");
    return jwt.decode(user);
};

app.config.globalProperties.$getInfo = getInfo;
app.config.globalProperties.$TimeAgo = TimeAgo;
app.config.globalProperties.$endPoint = "http://localhost:3000";


app.use(VueAxios, axios);
app.use(router);
app.mount("#app");