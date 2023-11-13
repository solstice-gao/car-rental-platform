<template>
	<view>
		<u-navbar title="确认订单" :autoBack="true" style="height: 50px;">
		</u-navbar>
		<web-view :src="webviewUrl"></web-view>
	</view>
</template>

<script>
	import orderService from '../../static/service/order_service.js'
	export default {
		data() {
			return {
				orderId: "",
				orderNo: "",
				link: "",	
			}
		},
		created() {
			// 在页面创建时订阅生命周期事件
			uni.$on('app-lifecycle-changed', this.handleAppLifecycleChange);
		},
		destroyed() {
			// 在页面销毁时取消订阅事件，以防止内存泄漏
			uni.$off('app-lifecycle-changed', this.handleAppLifecycleChange);
		},
		computed: {
			webviewUrl() {
				this.link = this.$route.query.url;
				this.orderNo = this.$route.query.orderNo;
				this.orderId = this.$route.query.orderId;
				// 获取传递过来的参数
				return this.$route.query.url;
			}
		},
		methods: {
			async handleAppLifecycleChange(status) {
				if(status === "show"){
					uni.showLoading({
						title: '正在查询支付状态'
					});
					const order = {
						businessId: this.orderNo,
						orderId: this.orderId
					}
					const orderStatus = await orderService.queryOrderStatus(order);
					uni.hideLoading();
					if(orderStatus.status === 0 || orderStatus.status === 1){
						uni.navigateTo({
							url: "/pages/index/index?id=1"
						})
					}
				}
			},
		},
	};
</script>