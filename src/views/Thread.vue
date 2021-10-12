<script>
import Header from "@/components/Header.vue";

export default {
	components: {
		Header,
	},
	methods: {
		reply(e) {
			var ctx = this;

			e.preventDefault();

			ctx.axios
				.post(
					ctx.$endPoint + "/thread/reply/" + ctx.id,
					{
						message: ctx.reply_text,
					},
					{
						headers: {
							authorization:
								"Bearer: " + localStorage.getItem("token"),
						},
					}
				)
				.then(function () {
					ctx.reply_text = null;
					ctx.loadThread();
				});
		},
		deleteReply(id) {
			var ctx = this;
			ctx.axios
				.delete(ctx.$endPoint + "/thread/reply/" + id, {
					headers: {
						authorization:
							"Bearer: " + localStorage.getItem("token"),
					},
				})
				.then(function () {
					ctx.loadThread();
				});
		},
		loadThread() {
			var ctx = this;
			ctx.axios
				.get(ctx.$endPoint + "/thread/" + ctx.id, {
					headers: {
						authorization:
							"Bearer: " + localStorage.getItem("token"),
					},
				})
				.then(function (res) {
					ctx.reply_post = res.data.message;
					ctx.thread = res.data.thread;

					document.title = "Groupomania | " + ctx.thread.title;

					for (
						let index = 0;
						index < ctx.reply_post.length;
						index++
					) {
						ctx.reply_post[index].format_date = ctx.format_date(
							ctx.reply_post[index].date
						);
					}

					ctx.thread.format_date = ctx.format_date(ctx.thread.date);
				});
		},
		format_date(date) {
			const timeAgo = new this.$TimeAgo("fr-FR");
			return timeAgo.format(new Date(date));
		},
	},
	data() {
		return {
			reply_text: null,
			reply_post: [],
			thread: {},
			id: this.$route.params.id,
			threadTiming: null,
		};
	},
	mounted() {
		var ctx = this;

		/* eslint no-empty: 0 */

		ctx.loadThread();
		ctx.threadTiming = setInterval(ctx.loadThread, 1000 * 5);
	},
	beforeUnmount() {
		var ctx = this;
		clearInterval(ctx.threadTiming);
	},
};
</script>

<template>
	<Header></Header>
	<section class="thread">
		<div class="thread-container">
			<div class="thread-post" v-if="thread">
				<div class="header-thread">
					<div class="title" :title="thread.title">
						{{ thread.title }}
					</div>
					<div class="author">
						de {{ thread.username }} à
						<span :title="thread.date">{{
							thread.format_date
						}}</span>
					</div>
				</div>
				<div class="message" v-if="thread.message != null">
					<div>{{ thread.message }}</div>
					<div class="image" v-if="thread.attachment">
						<img
							:src="
								'http://localhost:3000/uploads/' +
								thread.attachment
							"
						/>
					</div>
				</div>
				<div class="reply">
					<form @submit="reply">
						<label for="reply-text">Répondre au thread</label>
						<textarea
							name="reply-text"
							id="reply-text"
							cols="30"
							rows="10"
							maxlength="400"
							v-model="reply_text"
							required
						></textarea>
						<div class="end">
							<button>Envoyer le message</button>
						</div>
					</form>
				</div>
			</div>

			<h2>Les réponses du thread</h2>

			<div
				class="reply-post"
				v-for="(value, index) in reply_post"
				:key="index"
			>
				<div class="message">{{ value.message }}</div>
				<div class="author">
					<span :title="value.date">{{ value.format_date }}</span>
					<span>de {{ value.username }}</span>
				</div>
				<div
					class="delete"
					v-if="
						value.creator === $getInfo().userId ||
						$getInfo().status === 1
					"
					v-on:click="deleteReply(value.id)"
				>
					Supprimé
				</div>
			</div>
		</div>
	</section>
</template>