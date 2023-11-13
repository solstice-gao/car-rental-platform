<template>
	<view >
		<u-row class="coupon-body" customStyle="margin-bottom: 10px" v-for="coupon in coupons" :key="coupon">
			<u-col span="4">
				<view style="padding: 25px;">
					<p style="color: #e53b2b;font-size: 35px;"><span
							style="font-size: 25px;">¥&nbsp;</span>{{coupon.discountValue}}</p>
					<u-tag :text="coupon.discountType" type="error" shape="circle" size="mini" width="30"></u-tag>
				</view>
			</u-col>
			<u-col span="5.5">
				<view>
					<p style="color: #e53b2b;font-size: 20px;font-weight: 600;">{{coupon.description}}</p>
					<p style="color: #e53b2b;font-size: 8px;">限店铺内使用</p>
					<p style="color: #e53b2b;font-size: 8px;">有效期至{{timestampToTime(coupon.endDate)}}</p>
				</view>
			</u-col>
			<u-col span="2">
				<view>
					<u-button type="error" :plain="true" :hairline="true" text="使用" shape="circle" @click="checkDefault(coupon)"></u-button>
				</view>
			</u-col>
		</u-row>
	</view>
</template>

<script>
	import couponsService from '../../static/service/coupons_service.js'
	export default {
		props: {
			callBack: {
				type: Function,
				required: false,
			},
			companyId: {
				type: String,
				require: true
			},
			modelId: {
				type: String,
				require: true
			}
		},
		name: "couponinfo",
		data() {
			return {
				coupons: [],
				data:{},
			};
		},
		mounted() {
			this.fetchData();
		},
		methods: {
			checkDefault(item){
				this.data = item;
				this.callBack(this.data);
			},
			timestampToTime(timestamp) {
				const date = new Date(timestamp);
				const year = date.getFullYear();
				const month = (date.getMonth() + 1).toString().padStart(2, '0');
				const day = date.getDate().toString().padStart(2, '0');
				const hour = date.getHours().toString().padStart(2, '0');
				const minute = date.getMinutes().toString().padStart(2, '0');
				const second = date.getSeconds().toString().padStart(2, '0');
				return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
			},
			async fetchData() {
				uni.showLoading({
					title: '数据加载中'
				});
				const req = {
					companyId: this.companyId,
					modelId: this.modelId,
				};
				const data = await couponsService.queryByCompany(req);
				this.coupons = data.data;
				uni.hideLoading();
			}
		}
	}
</script>

<style>
	.coupon-body {
		height: 100px;
		background-color: #fae8e6;
		border-radius: 25px;
		margin: 10px;
	}
</style>