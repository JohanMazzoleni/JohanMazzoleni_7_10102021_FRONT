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
			<ul>
				<router-link :to="{ name: 'Home' }">Accueil</router-link>
			</ul>
			<ul>
				<router-link :to="{ name: 'createThread' }">
					Créer un message
				</router-link>
			</ul>
			<ul>
				<router-link :to="{ name: 'Settings' }">
					Paramètre
				</router-link>
			</ul>
			<ul v-on:click="logout">
				Déconnexion
			</ul>
		</nav>
	</section>
</template>