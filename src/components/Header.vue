<script>
export default {
	methods: {
		logout() {
			var ctx = this;
			localStorage.removeItem("token");
			ctx.$router.push({
				name: "Login",
			});
		},
	},
};
</script>

<template>
	<section class="header">
		<div class="logo">
			<router-link :to="{ name: 'Home' }"
				><img
					:src="require('@/assets/img/logo.png')"
					alt="Logo Groupomania"
				/>
			</router-link>
		</div>
		<nav class="navigation">
			<router-link :to="{ name: 'Home' }">
				<ul>
					Accueil
				</ul>
			</router-link>
			<router-link :to="{ name: 'createThread' }">
				<ul>
					Créer un message
				</ul>
			</router-link>
			<router-link :to="{ name: 'Settings' }">
				<ul>
					Paramètre
				</ul>
			</router-link>
			<ul v-on:click="logout">
				Déconnexion
			</ul>
		</nav>
	</section>
</template>