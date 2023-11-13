<template>
	<view>
		<view>
			<u-navbar :safeAreaInsetTop="false" :title="list.companyName" :fixed="false" :autoBack="false"
				@leftClick="backPage">
			</u-navbar>
		</view>
		<view class="list-body">
			<u-row class="coupon-body" customStyle="margin-bottom: 10px" v-for="coupon in list.carList" :key="coupon" @click="redirtToInfo(coupon.carId)">
				<u-col span="4">
					<view style="padding: 15px;">
						<image :src="coupon.imageUrl" style="width: 80px;height: 80px;"></image>
					</view>
				</u-col>
				
				<u-col span="8">
					<view style="padding-right: 15px;">
						<p style="font-size: 15px;">{{coupon.carDescTitle}}</p>
						<p style="font-size: 8px;color: #959595;">多车型随心选｜品质保证｜售后无忧</p>
						<p style="color: #e53b2b;font-size: 12px;margin-top: 10px;">到手价：{{coupon.price}}元/月起</p>
					</view>
				</u-col>
			</u-row>
		</view>
	</view>
</template>

<script>
	import companyService from '../../static/service/company_service.js'
	export default {
		data() {
			return {
				list: {}
			}
		},
		mounted() {
			this.fetchDate();
		},
		methods: {
			redirtToInfo(id){
				uni.navigateTo({
					url:"/pages/information/information?id="+id,
				})
			},
			getCompanyId() {
				return this.$route.query.companyId;
			},
			async fetchDate() {
				const data = await companyService.queryByCompanyId(this.getCompanyId());
				this.list = data.data[0];
			},
			backPage() {
				uni.navigateBack({
					delta: 1, // 返回的页面数，如果 B 界面是 A 的直接下一个界面，则填写 1
					success: () => {
						uni.$emit('refreshAddress', this.defaultAddress);
					},
				});
			},
		}
	}
</script>

<style>
	.list-body {
		
	}
	.coupon-body{
		background-color: #f4f5f6;
		border-radius: 20px;
		margin-left: 10px;
		margin-right: 10px;
	}
</style>