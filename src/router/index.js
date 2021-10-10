import { createRouter, createWebHistory } from 'vue-router'

const routes = [
	{
		path: '/',
		name: 'Home',
		component: () => import('../views/Home.vue')
	},
	{
		path: "/register",
		name: "Register",
		component: () => import('../views/Auth/Register.vue')
	},
	{
		path: "/login",
		name: "Login",
		component: () => import('../views/Auth/Login.vue')
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
