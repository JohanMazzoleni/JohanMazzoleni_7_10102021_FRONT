<script>
import Header from "@/components/Header.vue";

export default {
	components: {
		Header,
	},
	data() {
		return {
			forum: [],
		};
	},
	mounted() {
		var ctx = this;
		document.title = "Groupomania | Accueil";
		ctx.axios
			.get(ctx.$endPoint + "/forum/", {
				headers: {
					authorization: "Bearer: " + localStorage.getItem("token"),
				},
			})
			.then(function (res) {
				ctx.forum = res.data;
			});
	},
};
</script>

<template>
	<div>
		<Header></Header>
		<section class="forum">
			<div class="post" v-for="(value, index) in forum" :key="index">
				<div class="header-post">
					<div class="title" :title="value.title">
						{{ value.title }}
					</div>
					<div class="author" :title="value.username">
						de {{ value.username }}
					</div>
				</div>
				<div class="message">
					{{ value.message }}
				</div>
				<div class="more">
					<router-link
						:to="{ name: 'Thread', params: { id: value.id } }"
					>
						Cliquer ici pour la voir la suite
					</router-link>
				</div>
			</div>
		</section>
	</div>
</template>