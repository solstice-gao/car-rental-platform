<template>
	<view>
		<u-navbar title="我的订单" :autoBack="false" leftIcon="">
		</u-navbar>
		<!-- <u-subsection :list="list" mode="button" :current="current" bgColor="#FFFFFF" activeColor="#d92333"
			style="margin-top: 0px;" fontSize=16 @change="change" class="u-navbar"></u-subsection>
		<u-line></u-line> -->
	<u-line ></u-line>
		<view style="margin-top: 50px;">
			<kefu/>
			<view v-if="current == 0">
				<u-line style="margin-bottom: 10px;"></u-line>
				<u-loading-page :loading="orderLoding"></u-loading-page>
				<order v-if="orderListSize>0" v-for="item in orderList" :key="item" :orderInfo="item.rentalOrder"
					:carInfo="item.rentalCars" :colorModel="item.rentalCarModels" :companyInfo="item.rentalCompany" :carAddress="item.rentalCarAddress">
				</order>
				<u-empty v-if="orderListSize==0" mode="data" icon="http://cdn.uviewui.com/uview/empty/car.png">
				</u-empty>
			</view>
			<view v-if="current == 1">
				<locationinfo></locationinfo>
			</view>
		</view>
	</view>
</template>

<script>
	import locationinfo from '../../components/location-info/location-info';
	import order from '../../components/order/order';
	import orderService from '../../static/service/order_service.js'
	import kefu from '@/components/kefu.vue'
	export default {
		components: {
			order,
			locationinfo,
			kefu
		},
		data() {
			return {
				current: 0,
				list: ['我的订单'],
				orderList: [],
				orderListSize: 0,
				orderLoding: false,
			}
		},
		mounted() {
			this.getOrderList();
		},
		methods: {
			async getOrderList() {
				this.orderLoding = true;
				const data = await orderService.getOrderList();
				this.orderList = data;
				this.orderListSize = data.length;
				this.orderLoding = false;
			},
			change(index) {
				this.current = index
			}
		}
	}
</script>
<style scoped>
	.u-navbar {
		position: fixed;
		top: 35px;
		left: 0;
		right: 0;
		z-index: 999;
		/* 可能需要调整z-index以确保其在页面上方 */
		background-color: #ffffff;
		/* 可能需要调整背景颜色 */
	}
</style>