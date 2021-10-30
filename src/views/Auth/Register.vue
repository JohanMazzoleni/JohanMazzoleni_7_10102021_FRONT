<script>
import passwordValidator from "password-validator";

export default {
	mounted() {
		document.title = "Groupomania | S'inscrire";
	},
	data() {
		return {
			email: "test@example.com",
			username: "JohnDoe",
			password: "12345AAAZZZz",
			repassword: "12345AAAZZZz",
			errorMessage: null,
		};
	},
	methods: {
		register(e) {
			var ctx = this;
			e.preventDefault();

			if (ctx.password !== ctx.repassword) {
				ctx.$toast.open({
					message: "Les mots de passe ne sont pas identiques",
					type: "error",
				});
				return;
			}

			var schema = new passwordValidator();

			schema
				.is()
				.min(1)
				.is()
				.max(80)
				.has()
				.uppercase()
				.has()
				.lowercase()
				.has()
				.digits(1)
				.has()
				.not()
				.spaces()
				.is()
				.not()
				.oneOf(["Passw0rd", "Password123"]);

			let isValidPassword = schema.validate(ctx.password, {
				list: true,
			});

			let errorTemplate = {
				min: "Le mot de passe n'est pas assez long.",
				uppercase: "Votre mot de passe doit contenir des majuscules.",
				digits: "Le mot de passe doit contenir des chiffres.",
				letters: "Le mot de passe doit contenir des lettres",
				lowercase:
					"Le mot de passe doit contenir des lettres minuscule.",
				symbols: "Le mot de passe doit contenir des symboles",
			};

			if (isValidPassword[0]) {
				ctx.errorMessage = errorTemplate[isValidPassword[0]];
				return;
			} else {
				ctx.errorMessage = null;
			}

			ctx.axios
				.post(this.$endPoint + "/auth/register", {
					email: ctx.email,
					username: ctx.username,
					password: ctx.password,
				})
				.then(function (res) {
					if (res.data.status === true) {
						localStorage.setItem("token", res.data.token);
						ctx.$toast.open({
							message: "Votre inscription a bien été effectuer.",
							type: "success",
						});
						ctx.$router.push({
							name: "Home",
						});
					}
				})
				.catch(function (err) {
					let errorMessage = "Une erreur est survenue.";
					if (err.response.data.err && err.response.status == "409") {
						if (err.response.data.err == "email_already_used") {
							errorMessage = "Votre email est déjà utilisé.";
						} else if (
							err.response.data.err == "username_already_used"
						) {
							errorMessage =
								"Votre nom d'utilisateur est déjà utilisé.";
						}
					}
					ctx.$toast.open({
						message: errorMessage,
						type: "error",
					});
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
					<span v-if="errorMessage" class="errors">{{
						errorMessage
					}}</span>
				</div>
				<div class="col-1">
					<label for="password">Répeter mot de passe: </label>
					<input
						id="repassword"
						type="password"
						v-model="repassword"
						maxlength="80"
						required
					/>
				</div>
				<div class="col-2">
					<button type="submit">S'inscrire</button>
					<router-link :to="{ name: 'Login' }"
						>Se connecter</router-link
					>
				</div>
			</form>
		</div>
	</section>
</template>