<template>


	<view class="car-company">
		<view class="company-name">
			<text>{{car.companyName}}</text>
			<view class="demo-tag-text" @click="redirtToList(car.companyId)">
				更多》
			</view>
		</view>
		<u-scroll-list class="company-cars-scroll" :indicator="false">
			<view style="display: flex;" v-for="data in car.carList" :key="data.carId" @click="toInfo(data.carId)">
				<view class="company-car">
					<image class="car-image" :src="data.imageUrl"></image>
					<u--text :size="13" :lines="2" :text="data.carDesc" style="margin-right: 15px;"></u--text>
					<view class="car-price-tag" v-if="data.discount">
						<p style="font-size: 0.5em;">折扣价</p>
					</view>
					<view class="car-price">
						<text>¥{{data.price}}</text>
						<image src="../../../static/qiang.png" style="height: 15px;width: 15px;margin-left: 5px;">
						</image>
					</view>
				</view>
			</view>
		</u-scroll-list>
	</view>

</template>

<script>
	export default {
		props:{
			car:{
				type: Object,
				require
			}
		},
		data() {
			return {
				
			}
		},
		mounted() {
		},
		methods: {
			redirtToList(companyId){
				uni.navigateTo({
					url:"/pages/list/list?companyId="+companyId,
				})
			},
			toInfo(id){
				uni.navigateTo({
					url:"/pages/information/information?id="+id,
				})
			}
		}
	}
</script>

<style scoped>
	page{
		background-color: #FFFFFF;
	}
	.car-price {
		display: flex;
		align-items: center;
		color: #f80006;
		font-size: 16px;
		font-weight: bold;
		margin-right: 5px;
		margin-left: 5px;
		position: absolute;
		/* 子容器设置为绝对定位 */
		bottom: 5px;
		/* 距离底部5px */

	}

	.car-price-tag {
		color: #f80006;
		font-weight: normal;
		border: 1px #f80006 solid;
		border-radius: 5px;
		padding: 2px;
		display: inline-block;
		margin: 0.5vh;

	}

	.car-company {
		height: 38vh;
		border-radius: 10px;
		/* background-image: linear-gradient(to bottom right, #fac986, #ffffff, #fded84); */
		background-color: #F4F5F6;
		margin: 22px;
	}

	.car-image {
		width: 100%;
		height: 50%;
		border-radius: 6px 6px 0px 0px;
	}

	.company-car {
		margin: 10px 10px 10px 5px;
		background-color: #FFFFFF;
		border-radius: 6px;
		height: 30vh;
		width: 113px;
		position: relative;

	}

	.company-name {
		padding: 10px;
		font-weight: 500;
		display: flex;
		gap: 8px;
	}

	.car-price {
		display: flex;
		align-items: center;
		color: #f80006;
		font-size: 16px;
		font-weight: bold;
		margin-right: 5px;
		margin-left: 5px;
		position: absolute;
		/* 子容器设置为绝对定位 */
		bottom: 5px;
		/* 距离底部5px */

	}

	.car-price-tag {
		color: #f80006;
		font-weight: normal;
		border: 1px #f80006 solid;
		border-radius: 5px;
		padding: 2px;
		display: inline-block;
		margin: 0.5vh;

	}

	.car-company-item {
		height: 28vh;
	}

	.car-company {
		height: 40vh;
		border-radius: 10px;
		/* background-image: linear-gradient(to bottom right, #fac986, #ffffff, #fded84); */
		/* margin: 22px; */
		margin: 5px;
	}

	.car-image {
		width: 100%;
		height: 45%;
		border-radius: 6px 6px 0px 0px;
	}

	.company-cars-scroll {
		height: 100%;
	}


	.demo-tag-text {
		background-color: #000000;
		color: #FFFFFF;
		margin-left: 10px;
		border-radius: 50rpx;
		line-height: 1;
		padding-left: 24rpx;
		padding-right: 14rpx;
		display: flex;
		align-items: center;
		border-radius: 50rpx;
		font-size: 20rpx;
		margin-left: auto;
		margin-right: 10px;

	}
</style>