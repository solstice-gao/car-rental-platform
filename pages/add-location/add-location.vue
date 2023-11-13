<template>
	<view>
		<view class="location-title">
			<view class="icon-container" @click="backPage">
				<u-icon name="arrow-left"></u-icon>
			</view>
			<view class="text-container">
				<h3>新增收货地址</h3>
			</view>

		</view>

		<view class="location-body">
			<u--form labelPosition="left" :model="form_model" labelWidth=80>
				<u-form-item label="收货人" prop="userInfo.name" borderBottom>
					<u--input border="none" placeholder="请填写" v-model="form_model.userInfo.userName"></u--input>
				</u-form-item>
				<u-form-item label="手机号码" prop="userInfo.sex" borderBottom>
					<u--input border="none" placeholder="请填写" v-model="form_model.userInfo.phone"></u--input>
				</u-form-item>
				<u-form-item label="所在地区" prop="userInfo.sex" borderBottom @click="addressShow = true;">
					<u--input disabled disabledColor="#ffffff" placeholder="请填写" border="none" v-model="address"
						@click="addressShow = true;"></u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item label="详细地址" prop="userInfo.sex" borderBottom>
					<u--input border="none" placeholder="请填写" v-model="form_model.userInfo.street"></u--input>
				</u-form-item>
			</u--form>

			<address-picker :show="addressShow" closeOnClickOverlay @confirm='confirmAddress'
				@cancel='addressShow=false' @close='addressShow = false' :address-data="addressData" :indexs="indexs"
				:areaId="areaId" :type="type"></address-picker>
		</view>
		<view class="confirm-button">
			<u-button text="保存" @click="createNewAdress" type="info" />
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import adressService from '../../static/service/address_service.js'
	export default {
		data() {
			return {
				addressShow: false,
				address: '',
				indexs: [0, 0, 0],
				areaId: [1, 110000, 110101],
				addressData: ['北京市', '北京市', '东城区'],
				type: 3, //1-省，2-省市，3-省市区
				form_model: {
					userInfo: {
						userName: '',
						phone: '',
						province: '',
						city: '',
						county: '',
						street: ''
					},
				},
				error_toast: {
					type: 'error',
					icon: false,
					title: '失败主题',
					message: "请将信息填写完整"
				}
			}
		},
		methods: {
			confirmAddress(loaction) {
				this.form_model.userInfo.province = loaction.value[0];
				this.form_model.userInfo.city = loaction.value[1];
				this.form_model.userInfo.county = loaction.value[2];
				this.address = loaction.value.join('-')
				this.addressShow = false
			},
			backPage() {
				uni.navigateBack({
					delta: 1, // 返回的页面数，如果 B 界面是 A 的直接下一个界面，则填写 1
					success: () => {
						uni.$emit('refreshPage', { refresh: true });
					},
				});
			},
			async createNewAdress() {
				if (this.form_model.userInfo && this.form_model.userInfo.province && this.form_model.userInfo
					.userName && this.form_model.userInfo.phone && this.form_model.userInfo.street) {
					const res = await adressService.add(this.form_model.userInfo);
					if (res.code == 200) {
						this.backPage();
					}
				} else {
					this.showErrorToast();
				}

			},
			showErrorToast() {
				this.$refs.uToast.show({
					...this.error_toast,
					complete() {
						params.url && uni.navigateTo({
							url: params.url
						})
					}
				})
			}

		}
	}
</script>

<style scoped>
	.confirm-button {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 80%;
		padding: 10%;
		background-color: #ffffff;
		display: flex;
		justify-content: center;
	}

	.location-body {
		padding: 20px;
	}

	.location-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 5px;
		margin-bottom: 5px;
		padding: 20px 20px 10px 20px;
	}

	.icon-container {
		display: flex;
		align-items: flex-start;
		/* Align icon to the top */
	}

	.text-container {
		display: flex;
		flex: 1;
		justify-content: center;
		align-items: center;
	}
</style>