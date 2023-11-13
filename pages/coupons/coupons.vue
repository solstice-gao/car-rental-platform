<template>
	<view>
		<view>
			<u-navbar :safeAreaInsetTop="false" title="优惠券" :fixed="false" :autoBack="false" @leftClick="backPage">
			</u-navbar>
		</view>
		<couponinfo :callBack="callBack" :companyId="getCompanyId()" :modelId="getModelId()"></couponinfo>
	</view>
</template>

<script>
	import couponinfo from '../../components/couponinfo/couponinfo.vue'
	export default {
		components: {
			couponinfo,
		},
		data() {
			return {
				companyId: "",
				modelId:"",
				data:null
			}
		},
		mounted() {
			this.companyId = this.$route.query.companyId;
			this.modelId = this.$route.query.modelId;
		},
		methods: {
			callBack(data) {
				this.data = data;
				this.backPage();
			},
			getCompanyId() {
				return this.$route.query.companyId;
			},
			getModelId() {
				return this.$route.query.modelId;
			},
			backPage() {
				console.log(this.data);
				uni.navigateBack({
					delta: 1, // 返回的页面数，如果 B 界面是 A 的直接下一个界面，则填写 1
					success: () => {
						uni.$emit('refreshCoupon', this.data);
					},
				});
			}
		}
	}
</script>

<style>

</style>