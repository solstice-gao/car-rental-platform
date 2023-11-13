<template>

	<view class="car-company">
		<u-toast ref="uToast"></u-toast>
		<u-scroll-list class="company-cars-scroll" :indicator="false" style="background-color: #FFFFFF;">
			<view style="display: flex;background-color: #FFFFFF;border-radius: 15px;" v-for="key in list" :key="key">
				<view class="coupon-body">
					<u-row customStyle="margin-bottom: 10px">
						<u-col span="6" style="color: #ee5530;margin-top: 10px;padding-left: 10px;">
							<view class="demo-layout bg-purple-light" style="font-size: 28px;">
								<span style="font-size: 20px;">¥</span>{{key.discountValue}}
							</view>
							<view style="font-size: 12px;">{{key.title}}</view>
						</u-col>
						<u-col span="6">
							<view class="demo-layout bg-purple" style="padding-right: 10px;">
								<u-button text="领取" style="width: 40px;height: 25px;" @click="receive(key.couponId)"
									color="linear-gradient(to right, #fb4240, #fd4ea9)"></u-button>
							</view>
						</u-col>
					</u-row>
					<u-divider :dashed="true" lineColor="#ff0000" style="margin: 0px;"></u-divider>
					<view style="font-size: 12px;color: #ee5530;margin-top: 5px;padding-left: 10px;">指定店铺可用</view>
				</view>
			</view>
		</u-scroll-list>
	</view>
</template>

<script>
	import couponsService from '../../static/service/coupons_service.js'
	export default {
		name: "coupon",
		data() {
			return {
				list: [],
				loading: false,
				toast: {
					type: 'loading',
					title: '领取中.....',
					message: "领取中.....",
				},
				success: {
					type: 'success',
					title: '领取成功',
					message: "领取成功",
				},
				error: {
					type: 'error',
					title: '领取失败',
					message: "领取失败",
				},
			};
		},
		mounted() {
			this.fetchData();
		},
		methods: {
			async fetchData() {
				const data = await couponsService.queryAll();
				this.list = data.data;
				console.log(this.list);
			},
			async receive(couponId) {
				this.showErrorToast(this.toast);
				const req = {
					couponId: couponId
				}
				const data = await couponsService.receive(req);
				if (data.code === 200) {
					this.showErrorToast(this.success);
				} else {
					this.showErrorToast(this.error);
				}

				await this.fetchData();
				this.loading = false;
			},
			showErrorToast(error_data) {
				this.$refs.uToast.show({
					...error_data,
					complete() {

					}
				})
			}
		}
	}
</script>

<style>
	.coupon-body {
		width: 150px;
		height: 105px;
		margin-top: 10px;
		margin-left: 10px;
		margin-right: 10px;
		background-color: #fcefe9;
		border-radius: 15px;
	}

	.car-company {
		background-color: #f4f5f6;
	}
</style>