<script>
import Header from "@/components/Header.vue";

export default {
	components: {
		Header,
	},
	mounted()
	{
		document.title = "Groupomania | Accueil";
	}
};
</script>

<template>
	<div>
		<Header></Header>
	</div>
</template>