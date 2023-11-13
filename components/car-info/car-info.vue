<template>
	<view>

		<u-swiper :list="car_info.carImages" height="300" :autoplay='false'></u-swiper>
		<kefu />
		<view>
			<view class="car-price" v-if="colorModel=='' || colorModel == null">
				<span style="color: #fa513d;font-size: 12px;">¥ </span>
				<span style="color: #fa513d;font-size: 25px;">{{car_info.price}}</span>
				<span style="color: #fa513d;font-size: 10px;"> 起</span>
				<p style="font-size: 18px;margin-top: 5px;">{{car_info.carDescTitle}}</p>
			</view>
			<view class="car-price" v-else>
				<span style="color: #fa513d;font-size: 12px;">¥ </span>
				<span style="color: #fa513d;font-size: 25px;">{{colorModel.carPrice}}</span>
				<p style="font-size: 18px;margin-top: 5px;">{{car_info.carDescTitle}}</p>
			</view>
		</view>
		<view class="car-send-by font">
			<u-row customStyle="margin-bottom: 15px" justify="space-between" gutter="10">
				<u-col span="2">
					<view class="demo-layout bg-purple" style="color: #959595;">发货</view>
				</u-col>
				<u-col span="7">
					<view class="demo-layout bg-purple-light ">
						<span>{{car_info.carSendFrom}}</span>
						<span style="color: #dfdfdf;margin-left: 10px;margin-right: 10px;">｜</span>
						<span>{{car_info.carSendMarktext}}</span>
					</view>
				</u-col>
				<u-col span="3">
					<view class="demo-layout bg-purple-dark" style="color: #959595;">
						月销{{car_info.companyInfo.companyMonthlySales}}件</view>
				</u-col>
			</u-row>
			<u-row customStyle="margin-bottom: 15px" justify="space-between" gutter="10" @click="openLocationShow">
				<u-col span="2">
					<view class="demo-layout bg-purple" style="color: #959595;">提货</view>
				</u-col>
				<u-col span="7">
					<view v-if="defaultAdress=='' || defaultAdress == null">
						<span>请选择提货地址</span>
					</view>
					<view v-else>
						<u--text :lines="1"
							:text="`${defaultAdress.province}${defaultAdress.city}${defaultAdress.county}${defaultAdress.street}`"></u--text>
					</view>
				</u-col>
				<u-col span="3">
					<view class="demo-layout bg-purple-dark" style="color: #959595;"><u-icon name="arrow-right"
							color="#959595" size="12" style="float: right;"></u-icon></view>
				</u-col>
			</u-row>
			<u-row customStyle="margin-bottom: 15px" justify="space-between" gutter="10"
				@click="isSelectSpecifications=true;addCar=false">
				<u-col span="2">
					<view class="demo-layout bg-purple" style="color: #959595;">规格</view>
				</u-col>
				<u-col span="7">
					<view v-if="colorModel=='' || colorModel == null">
						<span>请选择颜色、型号分类</span>
					</view>
					<view v-else>
						<u--text :lines="1" :text="`${colorModel.color}-${colorModel.model}`"></u--text>
					</view>
				</u-col>
				<u-col span="3">
					<view class="demo-layout bg-purple-dark" style="color: #959595;"><u-icon name="arrow-right"
							color="#959595" size="12" style="float: right;"></u-icon></view>
				</u-col>
			</u-row>
		</view>

		<view class="car-send-by">
			<u-row customStyle="margin-bottom: 15px" justify="space-between" gutter="10">
				<u-col span="2">
					<image :src="car_info.companyInfo.companyIcon" class="logo-image" />
				</u-col>
				<u-col span="7">
					<view>
						<span>{{car_info.companyInfo.companyName}}</span>
					</view>
				</u-col>
				<u-col span="3">
					<view class="demo-layout bg-purple-dark" style="color: #959595;">
						<u-button text="进店逛逛" style="height: 30px;"
							@click="redirtToList(car_info.companyInfo.companyId)"></u-button>
					</view>
				</u-col>
			</u-row>
			<u-divider></u-divider>
			<u-row customStyle="margin-bottom: 5px" justify="space-between" gutter="10">
				<u-col span="2">
					<u-icon name="integral-fill" size="25"></u-icon>
				</u-col>
				<u-col span="9" @click="toBusiness">
					<view>
						<span>商家经营信息</span>
					</view>
				</u-col>
				<u-col span="1">
					<u-icon name="arrow-right" color="#959595" size="12"></u-icon>
				</u-col>
			</u-row>
		</view>

		<view style="padding-bottom: 50px;">
			<view class="car-desc-images" v-for="url in car_info.carDescImages" :key="url">
				<img :src="url" class="image" />
			</view>
		</view>

		<view>
			<u-popup :show="isSelectSpecifications" :round="10" mode="bottom" @close="close">
				<carcolormodel :car_info="car_info" :colorModel="colorModel"></carcolormodel>
				<view v-if="addCar">
					<u-button text="确认" shape="circle"
						style="color: #000;background-color: #f7ca48;border-radius: 10px;"></u-button>
				</view>
				<view v-else>
					<u-row justify="space-between" gutter="10" customStyle="margin:20px">
						<!-- <u-col span="6">
							<view class="demo-layout bg-purple-light"><u-button text="加入购物车" shape="circle"
									style="color: #c29302; border-radius: 10px;border: 1px solid #c29302;"></u-button>
							</view>
						</u-col> -->
						<u-col span="12">
							<view class="demo-layout bg-purple"><u-button text="立即购买" shape="circle" :throttleTime=500
									style="color: #FFFFFF;background-color: #f5373a;border-radius: 10px;"
									@click="createOrder"></u-button>
							</view>
						</u-col>
					</u-row>
				</view>
			</u-popup>
		</view>
		<view class="footer">
			<u-row justify="space-between" gutter="10">
				<u-col span="3">
					<view style="width: auto;">

					</view>
				</u-col>
				<u-col span="8">
					<view>
						<p>&nbsp</p>
						<!-- <u-button text="加入购物车" shape="circle" @click="isSelectSpecifications=true;addCar=true"
							style="color: #c29302; border-radius: 10px;border: 1px solid #c29302;"></u-button> -->
					</view>
				</u-col>
				<u-col span="7">
					<view>
						<u-button text="立即购买" shape="circle" @click="createOrder" :throttleTime=500
							style="color: #FFFFFF;background-color: #f5373a;border-radius: 10px;width: 25vw;margin: 10px"></u-button>
					</view>
				</u-col>
			</u-row>
			<u-toast ref="uToast"></u-toast>
		</view>
		<!-- 自提地址 -->

		<u-popup :show="locationShow" @close="closeLocationShow" @open="openLocationShow" :round="10"
			closeOnClickOverlay mode="bottom" :closeable="true">
			<locationinfo :callBack="callBack" :closePoP="closeLocationShow" :carId="id" :locationData="defaultAdress"
				style="margin-top: 30px; height: 70vh;"></locationinfo>
		</u-popup>

	</view>
</template>

<script>
	import {
		v4 as uuidv4
	} from 'uuid';
	import locationinfo from '../../components/location-info/location-info';
	import carcolormodel from '../car-color-model.vue';
	import carService from '../../static/service/car_service.js'
	import kefu from '../kefu.vue'
	export default {
		components: {
			carcolormodel,
			kefu,
			locationinfo
		},
		name: "carinfo",

		props: {
			id: {
				type: String,
				required: true,
			},
		},
		data() {
			return {
				car_info: {},
				hasDeliveryAddress: false,
				isSelectSpecifications: false,
				addCar: false,
				defaultAdress: null,
				colorModel: '',
				adressKey: '',
				locationShow: false,
			};
		},
		methods: {
			callBack(data) {
				this.defaultAdress = data;
			},
			closeLocationShow() {
				this.locationShow = false;
			},
			openLocationShow() {
				this.locationShow = true;
			},
			toBusiness() {
				uni.navigateTo({
					url: "/pages/business/business?companyId=" + this.car_info.companyInfo.companyId,
				})
			},
			redirtToList(companyId) {
				uni.navigateTo({
					url: "/pages/list/list?companyId=" + companyId,
				})
			},
			createOrder() {
				const error_data = {
					type: 'error',
					icon: false,
					message: "请将信息填写完整"
				}
				if (this.defaultAdress == null || this.defaultAdress == '') {
					error_data.message = "请选择提货地址"
					this.showErrorToast(error_data);
					return;
				}

				if (this.colorModel == null || this.colorModel == '') {
					error_data.message = "请选择规格"
					this.showErrorToast(error_data);
					return;
				}
				const uuid = uuidv4();
				const data = {
					colorModel: this.colorModel,
					address: this.defaultAdress,
					carInfo: this.car_info
				}

				const order = uni.setStorageSync(uuid, JSON.stringify(data));

				uni.navigateTo({
					url: "/pages/order/order?id=" + uuid,
				})
			},
			close() {
				this.isSelectSpecifications = false
			},
			async fetchData() {
				const car_info_res = await carService.queryById(this.id)
				this.car_info = car_info_res.data;
			},
			redritToLocation() {
				this.adressKey = uuidv4();
				uni.navigateTo({
					url: "/pages/location/location?id=" + this.car_info.carId + "&key=" + this.adressKey,
				})
			},
			refreshAddress(data) {
				this.defaultAdress = data;
			},
			refreshColorModel(data) {
				this.colorModel = data;
			},
			showErrorToast(error_data) {
				this.$refs.uToast.show({
					...error_data,
					complete() {

					}
				})
			}

		},
		mounted() {
			this.fetchData();
			uni.$on('refreshAddress', this.refreshAddress);
			uni.$on('refreshColorModel', this.refreshColorModel);
		}
	}
</script>

<style scoped>
	.footer {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: #ffffff;

		display: grid;
		align-items: center;
		/* 垂直居中 */
		justify-content: center;
		/* 水平居中 */
	}




	.font {
		font-size: 15px;
	}

	.car-price {
		padding: 20px;
		background-color: #FFFFFF;
	}

	.company-info {
		margin-bottom: 10px;
	}

	.company-row {
		display: flex;
		justify-content: space-between;
		/* 水平均匀分布 */
		align-items: center;
	}

	.logo-image {
		width: 25px;
		height: 25px;
	}

	.company-details {
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-left: 10px;
	}

	.company-name {
		font-weight: bold;
	}

	.car-desc-images {
		/* height: 100vh; */
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.image {
		max-width: 100%;
		max-height: 100%;
	}

	.car-send-by {
		margin-top: 5px;
		margin-bottom: 5px;
		padding: 20px 20px 10px 20px;
		background-color: #FFFFFF;

		.view {
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}

	.company-info {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>