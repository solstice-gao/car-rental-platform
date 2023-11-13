<template>
	<view>
		<web-view :src="webviewUrl"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderId: "",
				orderNo: "",
				link: "",	
			}
		},
		
		computed: {
			webviewUrl() {
				// 获取传递过来的参数
				return this.$route.query.url;
			}
		},
		methods: {
		
		},
	};
</script>