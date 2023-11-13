<template>
	<view style="padding: 20px;">
		<u-row customStyle="margin-bottom: 10px" gutter="10" justify="space-between">
			<u-col span="3">
				<view class="">
					<image :src="car_info.carImages[0]" style="width: 80px;height: 80px;"></image>
				</view>
			</u-col>
			<u-col span="9">
				<view class="" style="margin-left: 10px;">
					<view v-if="modelPrice>0">

						<u-row gutter="10" justify="space-between">


							<u-col span="6">
								<view>
									<u-text v-if="colorModel.carInitialFee>0"
										:text="`首期费用:¥${colorModel.carInitialFee}`" type="info" size=8></u-text>
									<u-text v-if="colorModel.carProcessingFee>0"
										:text="`办理费:¥${colorModel.carProcessingFee}`" type="info" size=8></u-text>
									<u-text v-if="colorModel.carBatteryFee>0"
										:text="`电池费:¥${colorModel.carBatteryFee}/月`" type="info" size=8></u-text>
									<u-text v-if="colorModel.carInsuranceFee>0"
										:text="`保险费:¥${colorModel.carInsuranceFee}/月`" type="info" size=8></u-text>
									<u-text v-if="colorModel.carPrice>0" :text="`基础使用费:¥${colorModel.carPrice}/月`"
										type="info" size=8></u-text>
								</view>
							</u-col>
							<u-col span="6">
								<view>
									<span style="color: #fa513d;">首期 ¥</span>
									<span style="color: #fa513d;font-size: 20px;">{{firstPrice}}</span>
									<span style="color: #fa513d;">/月</span>
								</view>
								<view>
									<span style="color: #fa513d;">后续 ¥</span>
									<span style="color: #fa513d;font-size: 20px;">{{afterPrice}}</span>
									<span style="color: #fa513d;">/月</span>
								</view>
							</u-col>
						</u-row>
					</view>
					<!-- <view style="margin-bottom: 10px;">
						<span style="color: #fa513d;">¥</span>
						<span v-if="modelPrice>0" style="color: #fa513d;font-size: 20px;">{{modelPrice}}</span>
						<span v-else style="color: #fa513d;font-size: 20px;">{{car_info.rangePrice}}</span>
					</view> -->

					<p v-if="modelPrice==0" style="font-size: 15px;">请选择颜色、型号</p>
				</view>
			</u-col>
		</u-row>
		<view style="margin-top: 30px;">
			<p>颜色</p>
			<view class="u-page__tag-item" v-for="(item, index) in colors" :key="index" v-show="!item.disabled">
				<u-tag :disabled="false" :text="item.color" :plain="!item.checked"  type="error" :name="index" :bgColor="!item.checked ? '#FFFFFF':''"
					plainFill  @click="colorClick(item)">
				</u-tag>
			</view>
		</view>

		<view style="margin-top: 30px;">
			<p>型号</p>
			<view  v-for="(item, index) in models" :key="index" v-show="!item.disabled" class="u-page__tag-item" >
				<u-tag :text="item.model" :plain="!item.checked" type="error" :name="index" plainFill
				            :bgColor="!item.checked ? '#FFFFFF':''"
				            @click="modelClick(item)">
				        </u-tag>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "carcolormodel",
		props: {
			car_info: {
				type: Object,
				required: true,
			},
			colorModel: {
				type: Object
			}
		},
		data() {
			return {
				colors: Array.from(new Set(this.car_info.carModels.map(item => item.color))).map(item => {
					return {
						color: item,
						checked: false,
						disabled: false,
					};
				}),
				models: Array.from(new Set(this.car_info.carModels.map(item => item.model))).map(item => {
					return {
						model: item,
						checked: false,
						disabled: false,
					};
				}),
				colorModelDataMap: {},
				colorModel: {},
				clickedColor: "",
				clickedModel: "",
				modelPrice: "0",
				firstPrice: "0",
				afterPrice: "0",
			};
		},
		methods: {
			colorClick(data) {
				this.colors.map(item => {
					if (item.color === data.color) {
						item.checked = true;
						this.clickedColor = item.color;
					} else {
						item.checked = false;
					}
				});

				const chiose = this.colorModelDataMap[data.color];

				const keys = Object.keys(chiose);
				this.modelPrice = 0;
				this.models.map(model => {
					if (keys.includes(model.model)) {
						model.disabled = false;
					} else {
						model.disabled = true;
						model.checked = false;
					}
				})
				this.updatePrice();
			},
			modelClick(data) {
				this.models.map(item => {
					if (item.model === data.model) {
						item.checked = true;
						this.clickedModel = item.model;
					} else {
						item.checked = false;
					}
				});
				this.updatePrice();
			},
			updatePrice() {
				if (this.clickedModel != null && this.clickedColor != null) {
					const model = this.colorModelDataMap[this.clickedColor][this.clickedModel];
					if (model) {
						this.modelPrice = model.carPrice;
						this.colorModel = model;
						this.firstPrice = model.carPrice + model.carInitialFee + model.carProcessingFee + model
							.carBatteryFee + model.carInsuranceFee;
						this.afterPrice = model.carPrice + model.carBatteryFee + model.carInsuranceFee;
					}
					uni.$emit('refreshColorModel', model);
				}
			},
		},
		mounted() {
			// 初始化型号选择
			this.car_info.carModels.forEach(item => {
				if (!this.colorModelDataMap[item.color]) {
					this.colorModelDataMap[item.color] = {};
				}
				if (!this.colorModelDataMap[item.color][item.model]) {
					this.colorModelDataMap[item.color][item.model] = item;
				}
			});
			
			console.log(this.colorModelDataMap);
		}
	}
</script>

<style scoped>
	.auto-width {
	    display: inline-block; /* 让宽度自动适应内容 */
	    min-width: 40px; /* 设置最小宽度 */
	    max-width: 200px; /* 设置最大宽度 */
	    /* 可根据需要调整 min-width 和 max-width 的值 */
	}
	.u-page__tag-item {
		/* margin-right: 20px; */
		display: inline-block;
		min-width: 40px; /* 设置最小宽度 */
		max-width: 200px; /* 设置最大宽度 */
		margin-right: 10px;
		margin-top: 10px;
	}
</style>