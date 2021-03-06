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
		path: "/settings",
		name: "Settings",
		component: () => import('../views/Settings.vue'),
		meta: {
			auth: 1
		}
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
		path: '/thread/edit/:id',
		name: 'editThread',
		component: () => import('../views/editThread.vue'),
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
	if (to.meta.auth) {
		const token = localStorage.getItem("token");
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
})

export default router
