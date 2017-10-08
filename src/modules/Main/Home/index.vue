<template>
	<div class="Home">
		<el-row type="flex" class="row-bg" justify="center">
			Logo
		</el-row>
		<el-row type="flex" class="row-bg" justify="center">
			<el-button @click="onClickPicture">Enviar foto</el-button>
		</el-row>
		<el-row type="flex" class="row-bg" justify="center">
			<el-button>Sobre</el-button>
		</el-row>
	</div>
</template>
<script>

	export default {
		name: 'home',
		methods: {
			onClickPicture() {
				this.$router.push({ path: 'home' })
			}
		}
	}
</script>
<style lang="scss" scoped src="./style.scss"></style>
