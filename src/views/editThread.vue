<script>
import Header from "@/components/Header.vue";

export default {
	components: {
		Header,
	},
	data() {
		return {
			id: this.$route.params.id,
			title: null,
			message: null,
			image: null,
			deleteImage: false,
			mime: [
				"image/png",
				"image/gif",
				"image/jpeg",
				"image/png",
				"image/webp",
			],
		};
	},
	methods: {
		editThread(e) {
			var ctx = this;
			e.preventDefault();

			var image = document.getElementById("image");

			var formData = new FormData();

			if (image.files[0]) {
				formData.append("image", image.files[0]);
			}

			formData.append("title", ctx.title);
			formData.append("message", ctx.message);
			formData.append("deleteImage", ctx.deleteImage ? 1 : 0);

			ctx.axios
				.post(ctx.$endPoint + "/thread/edit/" + ctx.id, formData, {
					headers: {
						authorization:
							"Bearer: " + localStorage.getItem("token"),
					},
				})
				.then(function () {
					ctx.$router.push({
						name: "Thread",
						params: {
							id: ctx.id + "-" + ctx.slugify(ctx.title),
						},
					});
				});
		},
		slugify(str) {
			str = str.replace(/^\s+|\s+$/g, "");

			str = str.toLowerCase();
			var from =
				"ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;";
			var to =
				"AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------";
			for (var i = 0, l = from.length; i < l; i++) {
				str = str.replace(
					new RegExp(from.charAt(i), "g"),
					to.charAt(i)
				);
			}
			str = str
				.replace(/[^a-z0-9 -]/g, "")
				.replace(/\s+/g, "-")
				.replace(/-+/g, "-");
			return str;
		},
	},
	mounted() {
		var ctx = this;

		document.title = "Groupomania | Modifié le thread";
		ctx.axios
			.get(ctx.$endPoint + "/thread/" + ctx.id, {
				headers: {
					authorization: "Bearer: " + localStorage.getItem("token"),
				},
			})
			.then(function (res) {
				ctx.title = res.data.thread.title;
				ctx.message = res.data.thread.message;
				ctx.attachment = res.data.thread.attachment;
			})
			.catch(function () {
				ctx.$router.push({
					name: "Home",
				});
			});
	},
};
</script>

<template>
	<Header></Header>
	<section class="createThread">
		<div class="thread-form">
			<form @submit="editThread">
				<div class="col-2">
					<label for="title">Titre</label>
					<input
						type="text"
						id="title"
						maxlength="50"
						v-model="title"
						accept=""
						required
					/>
				</div>
				<div class="col-2">
					<label for="message">Message</label>
					<textarea
						name="message"
						id="message"
						cols="30"
						rows="5"
						maxlength="400"
						v-model="message"
						required
					></textarea>
				</div>
				<div class="col-2">
					<label for="message">Image</label>
					<input type="file" id="image" :accept="mime.join(',')" />
				</div>
				<div class="col-2" v-if="attachment">
					<img
						:src="'http://localhost:3000/uploads/' + attachment"
						width="150"
					/>
				</div>
				<div class="col-2">
					<label for="deleteImage">Supprimé l'image</label>
					<input
						type="checkbox"
						id="deleteImage"
						name="deleteImage"
						v-model="deleteImage"
					/>
				</div>
				<div class="col-2">
					<button type="submit">Modifié le thread</button>
				</div>
			</form>
		</div>
	</section>
</template>