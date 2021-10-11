<script>
export default {
	mounted() {
		document.title = "Groupomania | S'inscrire";
	},
	data() {
		return {
			email: "test@example.com",
			username: "JohnDoe",
			password: "12345",
		};
	},
	methods: {
		register(e) {
			var ctx = this;
			e.preventDefault();
			ctx.axios
				.post(this.$endPoint + "/auth/register", {
					email: ctx.email,
					username: ctx.username,
					password: ctx.password,
				})
				.then(function (res) {
					if (res.data.status === true) {
						localStorage.setItem("token", res.data.token);
						alert("Votre inscription a bien été effectuer.");
						ctx.$router.push({
							name: "Home"
						})
					}
				})
				.catch(function (err) {
					let errorMessage = "Une erreur est survenue.";
					if (err.response.data.err && err.response.status == "409")
					{
						if (err.response.data.err == "email_already_used")
						{
							errorMessage = "Votre email est déjà utilisé.";
						}
						else if (err.response.data.err == "username_already_used")
						{
							errorMessage = "Votre nom d'utilisateur est déjà utilisé.";
						}
					}
					alert(errorMessage);
				});
		},
	},
};
</script>

<template>
	<section class="login">
		<div class="login-box">
			<h1>Inscription</h1>
			<form @submit="register">
				<div class="col-1">
					<label for="email">Email: </label>
					<input
						id="email"
						type="email"
						v-model="email"
						maxlength="320"
						required
					/>
				</div>
				<div class="col-1">
					<label for="username">Pseudonyme: </label>
					<input
						id="username"
						type="text"
						v-model="username"
						maxlength="32"
						pattern="[A-z0-9]+"
						required
					/>
				</div>
				<div class="col-1">
					<label for="password">Mot de passe: </label>
					<input
						id="password"
						type="password"
						v-model="password"
						maxlength="80"
						required
					/>
				</div>
				<div class="col-2">
					<button type="submit">S'inscrire</button>
					<router-link :to="{ name: 'Login' }"
						>Déjà inscrit ?</router-link
					>
				</div>
			</form>
		</div>
	</section>
</template>