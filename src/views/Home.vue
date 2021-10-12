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
			ctx.axios
				.delete(ctx.$endPoint + "/thread/" + id, {
					headers: {
						authorization:
							"Bearer: " + localStorage.getItem("token"),
					},
				})
				.then(function () {
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
        }
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
		<div class="forum">
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
				<div class="thread-option">
					<router-link
						:to="{ name: 'Thread', params: { id: value.id + '-' + slugify(value.title) } }"
						><div class="more">
							Cliquer ici pour la voir la suite
						</div>
					</router-link>
					<div
						class="delete"
						v-if="
							value.creator === $getInfo().userId ||
							$getInfo().status === 1
						"
						v-on:click="deleteThread(value.id)"
					>
						Supprimer le thread
					</div>
				</div>
			</div>
		</div>
	</div>
</template>