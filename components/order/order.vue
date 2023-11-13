<template>
	<view class="orderBody" @click="redireToOrderInfo">
		<u-row style=" display: flex; justify-content: space-between; align-items: center;">
			<div style="display: flex; align-items: center;">
				<u-icon name="bag" size="25"></u-icon>
				<span style="font-size: 17px;">{{companyInfo.companyName}}</span>
			</div>
			<p style="color: #ff7817;">{{getOrderDesc()}}</p>
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
						<u--text :lines="1" :text="`${this.colorModel.color}-${this.colorModel.model}`" type="info"
							size=15></u--text>
					</view>
				</view>

			</u-col>
			<u-col span="2">
				<view style="display: flex; justify-content: flex-end;">
					<!-- <u--text :lines="2" :text="`¥${}`"></u--text> -->
					<p>¥{{firstPrice}}</p>
				</view>
			</u-col>
		</u-row>

		<u-row gutter="10" justify="space-between" style="margin-top: 10px;margin-bottom: 10px;">
			<u-col span="12">
				<view style="display: flex; justify-content: flex-end;">
					<p style="color: #969696;font-size: 15px;margin-right: 10px;">总价 ¥{{firstPrice}} </p>
					<p> 实付款 ¥{{payablePrice}}</p>
				</view>
			</u-col>
		</u-row>

		<u-button v-if="orderInfo.orderStatus==0" size="small" text="立即支付"
			style="width: 80px;float: right;margin-bottom:10px ;color: black;background-color: #f8d35c;" @click="toPay(orderInfo)"></u-button>
			
		<u-button v-if="orderInfo.orderStatus==1" type="success" size="small" text="联系自提"
				style="width: 80px;float: right;margin-bottom:10px ;color: black;" @click="makePhoneCall(carAddress.phone)"></u-button>

	
		<u-modal :show="show"  :title="title" @confirm="show=false">
			<view style="width: 100%;">
				<u-cell-group>
						<u-cell title="订单号" :value="orderInfo.orderNo"></u-cell>
						<u-cell title="自提地址" :value="`${carAddress.province}${carAddress.city}${carAddress.county}${carAddress.street}`"></u-cell>
						<u-cell title="联系人" :value="carAddress.userName"></u-cell>
						<u-cell title="电话" :value="carAddress.phone"></u-cell>
					</u-cell-group>
			</view>
		</u-modal>


		<u-line></u-line>
	</view>
</template>

<script>
	import orderService from '../../static/service/order_service.js';
	export default {
		name: "order",
		props: {
			orderInfo: {
				type: Object,
				required: true,
			},
			carInfo: {
				type: Object,
				required: true,
			},
			colorModel: {
				type: Object,
				required: true,
			},
			companyInfo: {
				type: Object,
				required: true,
			},
			carAddress: {
				type: Object,
				required: true,
			},
		},
		data() {
			return {
				firstPrice:'0',
				payablePrice:'0',
				show: false,
				title: "订单信息",
				content: "content",
				coupon:{}
			};
		},
		mounted() {
		   this.orderId = this.$route.query.id;
		   this.firstPrice = this.orderInfo.totalPrice / 100;
		   this.payablePrice = this.orderInfo.payablePrice / 100;
		},
		methods:{
			redireToOrderInfo(){
				uni.redirectTo({
					url: `/pages/order-info/order-info?orderId=${this.orderInfo.orderId}`,
				});
			},
			makePhoneCall(phoneNumber) {
			      window.location.href = `tel:${phoneNumber}`;
			},
			toPay(orderInfo){
				console.log(orderInfo);
				uni.redirectTo({
					url: `/pages/webview/webview?url=${orderInfo.link}&orderNo=${orderInfo.orderNo}&orderId=${orderInfo.otherOrderId}`,
				});
			},
			
			getOrderDesc(){
				return orderService.getOrderStatusDesc(this.orderInfo.orderStatus);
			},
			showInfo(){
				if(this.orderInfo.orderStatus==0){
					return;
				}else if(this.orderInfo.orderStatus==1){
					this.show=true;
				}
			}
		}
	}
</script>

<style scoped>
	.orderBody {
		padding: 2px 22px 2px 22px;
	}
</style>