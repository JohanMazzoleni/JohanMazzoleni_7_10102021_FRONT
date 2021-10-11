<script>
export default {
	methods: {
		logout()
		{
			var ctx = this;
			localStorage.removeItem("token");
			ctx.$router.push({
				name: "Login"
			});
		}
	},
}
</script>

<template>
	<section class="header">
		<div class="logo">
			<img
				:src="require('@/assets/img/logo.png')"
				alt="Logo Groupomania"
			/>
		</div>
		<nav class="navigation">
			<ul>
				Accueil
			</ul>
			<ul>
				Forum
			</ul>
			<ul v-on:click="logout">
				Déconnexion
			</ul>
		</nav>
	</section>
</template>