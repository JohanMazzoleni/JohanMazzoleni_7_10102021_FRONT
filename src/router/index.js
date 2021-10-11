import { createRouter, createWebHistory } from 'vue-router'
// import axios from 'axios';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: () => import('../views/Home.vue'),
		meta: {
			auth: 1
		}
	},
	{
		path: "/register",
		name: "Register",
		component: () => import('../views/Auth/Register.vue'),
	},
	{
		path: "/login",
		name: "Login",
		component: () => import('../views/Auth/Login.vue'),
	},
	{
		path: '/thread/:id',
		name: 'Thread',
		component: () => import('../views/Thread.vue'),
		meta: {
			auth: 1
		}
	},
	{
		path: '/thread/create',
		name: 'createThread',
		component: () => import('../views/createThread.vue'),
		meta: {
			auth: 1
		}
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

router.beforeEach((to, from, next) => {
	// var ctx = this;
	if (to.meta.auth) {
		const token = localStorage.getItem("token") ? localStorage.getItem("token") : null;
		if (!token) {
			next({ name: "Login" });
		}
		else {
			next();
		}
	}
	else {
		next();
	}
	// console.log(to, from);
})

export default router
