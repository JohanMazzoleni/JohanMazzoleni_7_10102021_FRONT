<script>
import Header from "@/components/Header.vue";

export default {
	components: {
		Header,
	},
	data() {
		return {
			info: this.$getInfo(),
		};
	},
	methods: {
		deleteAccount() {
			var ctx = this;
			var deleteAcc = prompt(
				"Souhaitez-vous supprimer votre compte ? Écrivez votre email pour valider la suppression."
			);
			if (deleteAcc === ctx.info.email) {
				
				ctx.axios.delete(ctx.$endPoint + "/auth/delete", {
					headers: {
						authorization:
							"Bearer: " + localStorage.getItem("token"),
					},
				}).then(function()
                {
                    alert("Votre compte a été supprimé.");
                    ctx.$router.push({
                        name: "Register"
                    })
                });
			} else {
				alert(
					"Vous n'avez pas bien indiqué votre email, le compte n'a pas été supprimé"
				);
			}
		},
	},
	mounted() {
		document.title = "Groupomania | Paramètre";
	},
};
</script>

<template>
	<Header></Header>
	<section class="settings">
		<h1>Vos paramètres</h1>
		<p>Email: {{ info.email }}</p>
		<p>Username: {{ info.username }}</p>
		<p>Status: {{ info.status ? "Administrateur" : "Utilisateur" }}</p>
		<button v-on:click="deleteAccount">Fermer le compte</button>
	</section>
</template>