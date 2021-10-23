<script>
export default {
	mounted() {
		document.title = "Groupomania | Connexion";
	},
	data()
	{
		return {
			email: "test@example.com",
			password: "12345",
		}
	},
    methods: {
        login(e)
        {
			var ctx = this;
            e.preventDefault();
            ctx.axios.post(ctx.$endPoint + "/auth/login", {
				email: ctx.email,
				password: ctx.password,
			}).then(function(res)
			{
				if (res.data.status === true)
				{
					localStorage.setItem("token", res.data.token);
					alert("Félicitations, vous êtes bien connecté à votre compte.");
					ctx.$router.push({
						name: "Home",
					})
				}
			})
			.catch(function()
			{
				alert("Les identifiants sont incorrects.");
			});
        },
    }
};
</script>

<template>
	<section class="login">
		<div class="login-box">
			<h1>Connexion</h1>
			<form @submit="login">
				<div class="col-1">
					<label for="email">Email: </label>
					<input id="email" type="text" v-model="email" required>
				</div>
                <div class="col-1">
					<label for="password">Mot de passe: </label>
					<input id="password" type="password" v-model="password" required>
				</div>
				<div class="col-2">
					<button type="submit">Se connecter</button>
					<router-link :to="{name:'Register'}">Déjà inscrit ?</router-link>
				</div>
			</form>
		</div>
	</section>
</template>