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
	methods: {
		deleteThread(id) {
			var ctx = this;
			ctx.axios.delete(ctx.$endPoint + "/thread/" + id, {
				headers: {
					authorization: "Bearer: " + localStorage.getItem("token"),
				},
			}).then(function()
			{
				ctx.loadAllThread();
			});
		},
		loadAllThread() {
			var ctx = this;
			ctx.axios
				.get(ctx.$endPoint + "/thread/", {
					headers: {
						authorization:
							"Bearer: " + localStorage.getItem("token"),
					},
				})
				.then(function (res) {
					ctx.forum = res.data;
				});
		},
	},
	mounted() {
		var ctx = this;
		document.title = "Groupomania | Accueil";
		ctx.loadAllThread();
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
				<router-link :to="{ name: 'Thread', params: { id: value.id } }"
					><div class="more">Cliquer ici pour la voir la suite</div>
				</router-link>
				<div class="delete" v-if="value.creator === $getInfo().userId || $getInfo().status === 1" v-on:click="deleteThread(value.id)">
					Supprimer le thread
				</div>
			</div>
		</section>
	</div>
</template>