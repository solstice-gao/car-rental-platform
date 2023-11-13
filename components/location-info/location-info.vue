<template>
	<view class="location-title" >
		<u-list v-if="adressSize>0">
			<u-list-item v-for="item in adresss" :key="item">
				<u-cell-group>
					<u-row customStyle="margin: 5px 10px 10px 15px" justify="space-between" gutter="10"
						@click="checkDefault(item)" style="margin-left: 0px;">
						<u-col span="1"><image src="../../static/home_nav_home_selected.png" style="width: 30px;height: 30px;"></image>
						</u-col>
						<u-col span="8">
							<view>
								<p style="font-size: 18px;font-weight: 500;">{{item.userName}} <span style="font-size: 16px;font-weight: 200;margin-left: 10px;">{{item.phone}}</span></p>
							</view>
							<view>
								<u--text :lines="1" type="info"
									:text="`${item.province}${item.city}${item.county}${item.street}`"></u--text>
							</view>
						</u-col>
						<u-col span="2">
							<view v-if="item.default">
								<u-tag text="选中" plain style="width: 50px;" type="error"> </u-tag>
							</view>
						</u-col>
					</u-row>
				</u-cell-group>
			</u-list-item>
		</u-list>
		<u-empty v-if="adressSize==0" mode="data" icon="http://cdn.uviewui.com/uview/empty/car.png">
		</u-empty>
	</view>
</template>

<script>
	import adressService from '../../static/service/address_service.js'
	export default {
		props: {
			callBack: {
				type: Function,
				required: false,
			},
			closePoP: {
				type: Function,
				required: false,
			},
			carId:{
				type: String,
				require: true
			},
			locationData:{
				type: Object,
				required: false,
			}
		},
		name: "locationinfo",
		data() {
			return {
				adresss: {},
				defaultAddress: null,
				adressSize:0
			};
		},
		mounted() {
			this.fetchData();
			uni.$on('refreshPage', this.fetchData);
			// window.history.pushState(null, null, document.URL)
			// window.addEventListener("popstate", ()=>{
			// }, false);
		},
		methods: {
			async backtest(url){
				await this.fetchData();
				this.backPage();
			},
			async checkDefault(data) {
				this.adresss.map(item => {
					item.default = false;
				})
				data.default = true;
				this.defaultAddress = data;
				this.callBack(data);
				setTimeout(() => {
					uni.$u.toast("已选择"+data.province + data.city+data.county+data.street);
					this.closePoP();
				}, 500)
				
			},
			redirtAddLocation() {
				uni.navigateTo({
					url: "/pages/add-location/add-location?id=1",
				})
			},
			backPage() {
				uni.navigateBack({
					delta: 1, // 返回的页面数，如果 B 界面是 A 的直接下一个界面，则填写 1
					success: () => {
						uni.$emit('refreshAddress', this.defaultAddress);
					},
				});
			},
			async fetchData(data) {
			  const res = await adressService.queryAll(this.carId);
			  this.adresss = res.map(item => ({ ...item, default: false }));
			  this.adressSize = this.adresss.length;
			
			  if (this.adressSize > 0) {
			    if (!this.locationData) {
			      // 如果没有 locationData，将第一个地址设为默认
			      this.adresss[0].default = true;
			      this.defaultAddress = this.adresss[0];
			      this.callBack(this.defaultAddress);
			      uni.$u.toast('已默认选择第一个地址');
			    } else {
					console.log(123);
			      // 如果有 locationData，查找并设置匹配的地址为默认
			      this.adresss.forEach((adress) => {
			        if (adress.addressId === this.locationData.addressId) {
			          adress.default = true;
					  this.defaultAddress = adress;
			        }
			      });
			      this.callBack(this.defaultAddress);
			    }
			  }
			},showErrorToast(toast_data) {
				this.$refs.uToast.show({
					...toast_data,
					complete() {
			
					}
				})
			}
		}
	}
</script>

<style scoped>
	.address-title {
		font-size: 18px;
		margin-top: 2px
	}

	.address-content {
		margin-top: 3px;
		margin-bottom: 3px;
		font-size: 12px;
		color: #696969;
	}

	.location-title {
		margin-bottom: 5px;
		padding: 0px 20px 10px 20px;
		background-color: #FFFFFF;

		.view {
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>