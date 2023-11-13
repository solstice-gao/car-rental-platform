<template>
	<view>
		<u-navbar title="订单详情" :autoBack="false" @leftClick="backOrderList">
		</u-navbar>
		<u-loading-page :loading="orderLoding"></u-loading-page>
		<view class="location-body">
			<u-divider></u-divider>
			<kefu />
			<u-row gutter="10" >
				<u-icon name="map" size=20></u-icon><span style="font-size: 18px;">自提地址</span>
			</u-row>
			
			<u-row customStyle="margin-bottom: 5px;margin-top: 15px;margin-left:10px" justify="space-between" gutter="10">
				<u-col span="8">
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
				<u-col span="3">
					<view >
						<u-button text=" 拨打" icon="phone" type="primary" :plain="true" :hairline="true" style="width: 70px;" @click="makePhoneCall(address.phone)"></u-button>
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
						<image :src="carInfo.imageUrl" style="width: 60px;height: 60px;"></image>
					</view>
				</u-col>
				<u-col span="7">
					<view style="padding: 5px;">
						<view>
							<u--text :lines="2" :text="`${carInfo.carDesc}`"></u--text>
						</view>
						<view>
							<u--text :lines="1" :text="`${colorModel.color}-${colorModel.model}`" size=15></u--text>
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
						<u-text text="配送"></u-text>
					</view>
				</u-col>

				<u-col span="4">
					<view style="display: flex; justify-content: flex-end;color: #85888e;">
						<p>{{carInfo.carSendMarktext}}</p>
					</view>
				</u-col>
			</u-row>




			<u-row gutter="10" style="margin-top: 10px;">
				<u-col span="8">
					<view style="display: flex; justify-content: flex-start;">
						<u-text text="首期费用"></u-text>
					</view>
				</u-col>

				<u-col span="4">
					<view style="display: flex; justify-content: flex-end;color: #85888e;">
						<p>¥{{colorModel.carInitialFee}}</p>
					</view>
				</u-col>
			</u-row>


			<u-row gutter="10" style="margin-top: 10px;">
				<u-col span="9">
					<view>
						<u-text text="办理费用"></u-text>
					</view>
				</u-col>

				<u-col span="3">
					<view style="text-align: right;color: #85888e;">
						<p>¥{{colorModel.carProcessingFee}}</p>
					</view>
				</u-col>
			</u-row>
			<u-row gutter="10" style="margin-top: 10px;">
				<u-col span="9">
					<view>
						<u-text text="基础费用"></u-text>
					</view>
				</u-col>

				<u-col span="3">
					<view style="text-align: right;width: 100%;float: right;color: #85888e;">
						<p>¥{{colorModel.carPrice}}/月</p>
					</view>
				</u-col>
			</u-row>

			<u-row gutter="10" style="margin-top: 10px;">
				<u-col span="9">
					<view>
						<u-text text="电池费用"></u-text>
					</view>
				</u-col>

				<u-col span="3">
					<view style="display: flex; justify-content: flex-end;color: #85888e;">
						<p>¥{{colorModel.carBatteryFee}}/月</p>
					</view>
				</u-col>
			</u-row>

			<u-row gutter="10" style="margin-top: 10px;">
				<u-col span="9">
					<view>
						<u-text text="保险费用"></u-text>
					</view>
				</u-col>

				<u-col span="3">
					<view style="display: flex; justify-content: flex-end;color: #85888e;">
						<p>¥{{colorModel.carInsuranceFee}}/月</p>
					</view>
				</u-col>
			</u-row>

			<u-row gutter="10" style="margin-top: 10px;">
				<u-col span="8">
					<view>
						<u-text text="优惠券"></u-text>
					</view>
				</u-col>

				<u-col span="4">
					<view style="display: flex; justify-content: flex-end;" v-if="couponInfo!=null">
						<p style="color: #f7ca48;" @click="redritToCoupon">{{couponInfo.title}}</p>
					</view>
					<view style="display: flex; justify-content: flex-end;color: #85888e;" v-else>
						<p>未使用优惠券</p>
					</view>
				</u-col>
			</u-row>
			<u-divider></u-divider>
			<u-row gutter="10" style="margin-top: 10px;">
				<u-col span="4">
					<view>
						<u-text text="商品总价"></u-text>
					</view>
				</u-col>

				<u-col span="8">
					<view style="display: flex; justify-content: flex-end;color: #85888e;">
						<p style="font-weight: 300;color: black;"><span
								style="color: #85888e;margin-right: 10px;">商品总价</span><span
								style="color: #000;margin-right: 3px;font-size: 8px;">¥</span>&nbsp{{firstPrice}}</p>
					</view>
				</u-col>
			</u-row>
			<u-divider></u-divider>
			<u-row gutter="10" style="margin-top: 10px;">
				<u-col span="5">
					<view>
						<u-text text="订单编号"></u-text>
					</view>
				</u-col>

				<u-col span="7">
					<view style="display: flex; justify-content: flex-end;color: #85888e;">
						<p>{{orderInfo.orderId}}</p>
					</view>
				</u-col>
			</u-row>
			<u-row gutter="10" style="margin-top: 10px;">
				<u-col span="5">
					<view>
						<u-text text="支付编号"></u-text>
					</view>
				</u-col>

				<u-col span="7">
					<view style="display: flex; justify-content: flex-end;color: #85888e;">
						<p>{{orderInfo.orderNo}}</p>
					</view>
				</u-col>
			</u-row>

			<u-row gutter="10" style="margin-top: 10px;">
				<u-col span="5">
					<view>
						<u-text text="下单时间"></u-text>
					</view>
				</u-col>

				<u-col span="7">
					<view style="display: flex; justify-content: flex-end;color: #85888e;">
						<p>{{formatTime(orderInfo.createdTime)}}</p>
					</view>
				</u-col>
			</u-row>

			<u-divider></u-divider>

			<u-row gutter="10" style="margin-top: 10px;padding-bottom: 50px;">
				<u-col span="8"></u-col>
				<u-col span="4">
					<view style="display: flex; justify-content: flex-end;">
						<!-- <u-text text="共计1件"  size=10></u-text>
						<u-text text="总价:" size=10 ></u-text>
						<u-text :text="`¥${firstPrice}`" size=18 type="error"></u-text>
						 -->
						<u-text text="总价:" size=18></u-text>
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
						<p style="font-size: 20px;" v-if="orderInfo.orderStatus == 1">实付款:</p>
						<p style="font-size: 20px;" v-if="orderInfo.orderStatus == 0">待付款:</p>
						<p style="font-size: 20px;" v-if="orderInfo.orderStatus == -1">未付款:</p>
						<u-text :text="`¥${payablePrice}`" size=20 type="error"></u-text>
					</view>
				</u-col>
				<u-col span="6">
					<view v-if="orderInfo.orderStatus == 1">
						<u-button text="联系自提"  shape="circle" @click="makePhoneCall(address.phone)" :throttleTime=500
							style="color: #FFFFFF;background-color: #f5373a;order-radius: 10px;width: 25vw;"></u-button>
					</view>
					
					<view v-if="orderInfo.orderStatus == 0">
						<u-button text="立即支付" shape="circle" @click="toPay(orderInfo)" :throttleTime=500
							style="color: #000;background-color: #f8d35c;border-radius: 10px;width: 25vw;"></u-button>
					</view>
					
					<view v-if="orderInfo.orderStatus == -1">
						<u-button text="订单已取消" shape="circle" :disabled="true" :throttleTime=500
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
	import kefu from '@/components/kefu.vue'
	export default {
		components: {
			kefu
		},
		data() {
			return {
				orderId: "",
				carSendMarktext: "",
				colorModel: {},
				address: {},
				carInfo: {},
				orderInfo: {},
				companyInfo: {},
				firstPrice: 0,
				payablePrice: 0,
				coupons: 0,
				couponInfo: {},
				orderLoding: true
			}
		},
		methods: {
			getOrderId() {
				return this.orderId = this.$route.query.orderId;
			},
			makePhoneCall(phoneNumber) {
			      window.location.href = `tel:${phoneNumber}`;
			},
			formatTime(date) {
				if (!date) return '';
				const options = {
					year: 'numeric',
					month: 'numeric',
					day: 'numeric',
					hour: '2-digit',
					minute: '2-digit',
					second: '2-digit'
				};
				return new Date(date).toLocaleString(undefined, options);
			},
			toPay(orderInfo){
				uni.redirectTo({
					url: `/pages/webview/webview?url=${orderInfo.link}&orderNo=${orderInfo.orderNo}&orderId=${orderInfo.otherOrderId}`,
				});
			},
			async fetchData() {
				uni.showLoading({
					title: '数据加载中'
				});
				const data = await orderService.getOrderInfoById(this.getOrderId());
				this.orderInfo = data.rentalOrder;
				this.colorModel = data.rentalCarModels;
				this.address = data.rentalCarAddress;
				this.carInfo = data.rentalCars;
				this.companyInfo = data.rentalCompany;
				this.couponInfo = data.rentalCoupons;
				this.initFirstPrice();
				// this.coupon(this.companyInfo.companyId);
				console.log(data);
				uni.hideLoading();
				this.orderLoding = false;
			},
			refreshCoupon(data) {
				console.log(123);
				if(!data){
					return;
				}
				this.couponData = data;
				this.initFirstPrice();
				this.firstPrice = this.firstPrice - this.couponData.discountValue;
				if (this.firstPrice < 0) {
					this.firstPrice = 0;
				}
			},
			backOrderList(){
				uni.navigateTo({
					url: "/pages/index/index?id=1",
				})
			},
			redritToCoupon() {
				uni.navigateTo({
					url: "/pages/coupons/coupons?companyId=" + this.companyInfo.companyId,
				})
			},
			initFirstPrice() {
				this.firstPrice = this.orderInfo.totalPrice / 100;
				this.payablePrice = this.orderInfo.payablePrice / 100;
			},
			makePhoneCall(phoneNumber) {
			      window.location.href = `tel:${phoneNumber}`;
			},
		},
		mounted() {
			this.orderId = this.$route.query.id;
			this.fetchData();
			// uni.$on('refreshCoupon', this.refreshCoupon);
			
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
		padding: 45px 15px 1px 15px;
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