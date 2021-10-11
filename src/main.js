import { createApp } from "vue";
import App from "./App.vue";
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

const app = createApp(App);

app.config.globalProperties.$endPoint = "http://localhost:3000";

axios.interceptors.response.use(function (response) {
	return response;
}, function (error) {
	if (error.response.data && error.response.data.status == "bad_token")
    {
        localStorage.removeItem("token");
        router.push({name: "Login"});
    }
    return Promise.reject(error);
});

app.use(VueAxios, axios);
app.use(router);
app.mount("#app");