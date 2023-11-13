<template>
	<view>
		<u-navbar title="确认订单" :autoBack="true">
		</u-navbar>
		<view class="location-title">
			<!-- <view class="icon-container" @click="backPage">
				<u-icon name="arrow-left"></u-icon>
			</view>
			<view class="text-container">
				<h3>确认订单</h3>
			</view> -->
		</view>
		<view class="location-body">
			
			<u-row customStyle="margin-bottom: 5px;margin-top: 15px" justify="space-between" gutter="10">
				<u-col span="11">
					<view style="padding: 2px;">
						<u--text :lines="1" size=15
							:text="`${address.province}${address.city}${address.county}`"></u--text>
					</view>
					<view style="padding: 2px;">
						<u--text :lines="1" :text="`${address.street}`" size=20 bold=true></u--text>
					</view>
					<view style="padding: 2px;">
						<u--text :lines="1" :text="`${address.userName} ${address.phone}`" size=15></u--text>
					</view>
				</u-col>
				
				<u-col span="1">
					<view>
						<u-icon name="arrow-right"></u-icon>
					</view>
				</u-col>
			</u-row>
		</view>
		<u-divider style="margin: 0px;"></u-divider>
		<view class="order-body">
			<u-row gutter="10" @click="isSelectSpecifications=true;addCar=false">
				<u-icon name="bag" size=30></u-icon><span style="font-size: 18px;">{{companyInfo.companyName}}</span>
			</u-row>

			<u-row gutter="10" justify="space-between" style="margin-top: 10px;">
				<u-col span="2">
					<view>
						<image :src="carInfo.carImages[0]" style="width: 60px;height: 60px;"></image>
					</view>
				</u-col>
				<u-col span="7">
					<view style="padding: 5px;">
						<view>
							<u--text :lines="2" :text="`${carInfo.carDesc}`"></u--text>
						</view>
						<view>
							<u--text :lines="1" :text="`${colorModel.color}-${colorModel.model}`" type="info"
								size=15></u--text>
						</view>
					</view>

				</u-col>
				<u-col span="2">
					<view style="display: flex; justify-content: flex-end;">
						<!-- <u--text :lines="2" :text="`¥${}`"></u--text> -->
						<p>¥{{colorModel.carPrice}}</p>
					</view>
				</u-col>
			</u-row>

			<u-row gutter="10" style="margin-top: 10px;">
				<u-col span="8">
					<view style="display: flex; justify-content: flex-start;">
						<u-text text="配送" type="info"></u-text>
					</view>
				</u-col>

				<u-col span="4">
					<view style="display: flex; justify-content: flex-end;">
						<p>{{carInfo.carSendMarktext}}</p>
					</view>
				</u-col>
			</u-row>


			<u-row gutter="10" style="margin-top: 10px;">
				<u-col span="8">
					<view style="display: flex; justify-content: flex-start;">
						<u-text text="首期费用" type="info"></u-text>
					</view>
				</u-col>

				<u-col span="4">
					<view style="display: flex; justify-content: flex-end;">
						<p>¥{{colorModel.carInitialFee}}</p>
					</view>
				</u-col>
			</u-row>


			<u-row gutter="10" style="margin-top: 10px;">
				<u-col span="9">
					<view>
						<u-text text="办理费用" type="info"></u-text>
					</view>
				</u-col>

				<u-col span="3">
					<view style="text-align: right;">
						<p>¥{{colorModel.carProcessingFee}}</p>
					</view>
				</u-col>
			</u-row>
			<u-row gutter="10" style="margin-top: 10px;">
				<u-col span="9">
					<view>
						<u-text text="基础费用" type="info"></u-text>
					</view>
				</u-col>

				<u-col span="3">
					<view style="text-align: right;width: 100%;float: right;">
						<p>¥{{colorModel.carPrice}}/月</p>
					</view>
				</u-col>
			</u-row>

			<u-row gutter="10" style="margin-top: 10px;">
				<u-col span="9">
					<view>
						<u-text text="电池费用" type="info"></u-text>
					</view>
				</u-col>

				<u-col span="3">
					<view style="display: flex; justify-content: flex-end;">
						<p>¥{{colorModel.carBatteryFee}}/月</p>
					</view>
				</u-col>
			</u-row>

			<u-row gutter="10" style="margin-top: 10px;">
				<u-col span="9">
					<view>
						<u-text text="保险费用" type="info"></u-text>
					</view>
				</u-col>

				<u-col span="3">
					<view style="display: flex; justify-content: flex-end;">
						<p>¥{{colorModel.carInsuranceFee}}/月</p>
					</view>
				</u-col>
			</u-row>

			<u-row gutter="10" style="margin-top: 10px;">
				<u-col span="8">
					<view>
						<u-text text="优惠券" type="info"></u-text>
					</view>
				</u-col>

				<u-col span="4">
					<view style="display: flex; justify-content: flex-end;" v-if="couponData!=null">
						<p style="color: #f7ca48;" @click="redritToCoupon">{{couponData.title}}</p>
					</view>
					<view style="display: flex; justify-content: flex-end;" v-else>
						<p v-if="coupons == 0">无可用优惠券</p>
						<p v-else style="color: #f7ca48;" @click="redritToCoupon">有{{coupons}}张优惠券></p>
					</view>
				</u-col>
			</u-row>

			<u-row gutter="10" style="margin-top: 10px;">
				<u-col span="3">
					<view>
						<u-text text="备注" type="info"></u-text>
					</view>
				</u-col>

				<u-col span="9">
					<view style="display: flex; justify-content: flex-end;">
						<u--input v-model="carSendMarktext" border="none" placeholder="选填,请根据商家要求填写描述信息"></u--input>
					</view>
				</u-col>
			</u-row>


			<u-divider></u-divider>

			<u-row gutter="10" style="margin-top: 10px;">
				<u-col span="7"></u-col>
				<u-col span="5">
					<view style="display: flex; justify-content: flex-end;">
						<u-text text="共计1件" type="info" size=10></u-text>
						<u-text text="共计:" size=18></u-text>
						<u-text :text="`¥${firstPrice}`" size=18 type="error"></u-text>
					</view>
				</u-col>
			</u-row>
			<u-divider></u-divider>
		</view>



		<view class="footer">
			<u-row justify="space-between" gutter="10">
				<u-col span="3"></u-col>
				<u-col span="7">
					<view style="display: flex; justify-content: flex-end;">
						<p style="font-size: 20px;">首期:</p>
						<u-text :text="`¥${firstPrice}`" size=20 type="error"></u-text>
					</view>
				</u-col>
				<u-col span="6">
					<view>
						<u-button text="提交订单" shape="circle" @click="createPreOrder" :throttleTime=500
							style="color: #FFFFFF;background-color: #f5373a;border-radius: 10px;width: 25vw;"></u-button>
					</view>
				</u-col>
			</u-row>
			<u-toast ref="uToast"></u-toast>
		</view>

	</view>
</template>

<script>
	import orderService from '../../static/service/order_service.js';
	import couponsService from '../../static/service/coupons_service.js';
	export default {

		data() {
			return {
				orderId: "",
				carSendMarktext: "",
				colorModel: {},
				address: {},
				carInfo: {},
				companyInfo: {},
				firstPrice: 0,
				coupons: 0,
				couponData: null
			}
		},
		methods: {
			refreshCoupon(data) {
				this.couponData = data;
				this.initFirstPrice();
				this.firstPrice = this.firstPrice - this.couponData.discountValue;
				if (this.firstPrice < 0) {
					this.firstPrice = 0;
				}
			},
			redritToCoupon() {
				uni.navigateTo({
					url: "/pages/coupons/coupons?companyId=" + this.companyInfo.companyId+"modelId="+this.colorModel.modelId,
				})
			},
			async coupon(companyId) {
				const req = {
					companyId: companyId
				}
				const data = await couponsService.queryByCompany(req);
				
				const list = data.data.map(coupon=>{
					if(this.firstPrice>=coupon.minimumPurchase){
						return coupon;
					}
				})
				this.coupons = list.length;

			},
			initFirstPrice() {
				this.firstPrice = this.colorModel.carPrice + this.colorModel.carInitialFee + this.colorModel
					.carProcessingFee +
					this.colorModel
					.carBatteryFee + this.colorModel.carInsuranceFee;
			},
			async createPreOrder() {
				uni.showLoading({
					title: '订单创建中'
				});
				const order = {
					modelId: this.colorModel.modelId,
					addressId: this.address.addressId,
					couponId: this.couponData == null ? null : this.couponData.couponId,
					orderType: "ALIPAY",
					leaveComment: "测试"
				};
				const orderInfo = await orderService.getAlipayUrl(order);
				uni.redirectTo({
					url: `/pages/webview/webview?url=${orderInfo.link}&orderNo=${orderInfo.orderNo}&orderId=${orderInfo.orderId}`,
				});
				uni.hideLoading();
			}
		},
		mounted() {
			this.orderId = this.$route.query.id;
			const order = uni.getStorageSync(this.orderId);
			const orderInfo = JSON.parse(order)
			this.colorModel = orderInfo.colorModel;
			this.address = orderInfo.address;
			this.carInfo = orderInfo.carInfo;
			this.companyInfo = this.carInfo.companyInfo;
			this.initFirstPrice();
			this.coupon(this.companyInfo.companyId);
			uni.$on('refreshCoupon', this.refreshCoupon);
		}
	}
</script>

<style scoped>
	.footer-content {
		position: fixed;
		bottom: 12vh;
		justify-content: center;
		width: 100%;
	}

	.footer-content u-text {
		margin-left: 5px;
		/* 调整这个值来控制元素之间的间距 */
	}

	.footer {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: #ffffff;
		height: 9vh;
		display: grid;
		align-items: center;
		/* 垂直居中 */
		justify-content: center;
		/* 水平居中 */
	}

	.location-body {
		padding: 1px 15px 1px 15px;
		background-color: #FFFFFF;
	}

	.order-body {
		background-color: #FFFFFF;
		padding: 10px 15px 1px 15px;
	}

	.location-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 5px;
		padding: 20px 20px 10px 20px;
		background-color: #FFFFFF;
	}

	.icon-container {
		display: flex;
		align-items: flex-start;
		background-color: #FFFFFF;
		/* Align icon to the top */
	}

	.text-container {
		background-color: #FFFFFF;
		display: flex;
		flex: 1;
		justify-content: center;
		align-items: center;
	}
</style>