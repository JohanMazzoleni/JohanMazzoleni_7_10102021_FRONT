<style lang="scss">
	@import './assets/css/style.scss';
</style>

<template>
	<div id="nav">
		<router-link to="/">Home</router-link> |
		<router-link to="/about">About</router-link>
	</div>
	<router-view />
</template>