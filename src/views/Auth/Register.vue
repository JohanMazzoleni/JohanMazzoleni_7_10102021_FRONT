<script>
export default {
	mounted() {
		document.title = "Groupomania | S'inscrire";
	},
    methods: {
        register(e)
        {
            e.preventDefault();
            // console.log(this.axios);
        },
    }
};
</script>

<template>
	<section class="login">
		<div class="login-box">
			<h1>Inscription</h1>
			<form @submit="register">
				<div class="col-1">
					<label for="email">Email: </label>
					<input id="email" type="email" required>
				</div>
                <div class="col-1">
					<label for="username">Pseudonyme: </label>
					<input id="username" type="text" pattern="[A-z0-9]+" required>
				</div>
                <div class="col-1">
					<label for="password">Mot de passe: </label>
					<input id="password" type="password" required>
				</div>
				<div class="col-2">
					<button type="submit">S'inscrire</button>
					<router-link :to="{name:'Login'}">Déjà inscrit ?</router-link>
				</div>
			</form>
		</div>
	</section>
</template>