<template>
  <div id="app" v-loading="isLoading" element-loading-customClass="loading">
    <router-view></router-view>
  </div>
</template>

<script>
	import { mapGetters } from 'vuex';

	export default {
		name: 'app',
		computed: {
			...mapGetters({
				isLoading: 'isLoading'
			}),
		},
	}
</script>