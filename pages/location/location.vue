<template>
	<view>
		<view>
			<u-navbar :safeAreaInsetTop="false" title="提货地址" :fixed="false"  
				:autoBack="false" @leftClick="backPage">
			</u-navbar>
		</view>
		<locationinfo :callBack="callBack" :carId="getCarId()" style="padding-top: 0px;"></locationinfo>
	</view>
</template>

<script>
	import locationinfo from '../../components/location-info/location-info';
	export default {
		components: {
			locationinfo,
		},
		name: "location",
		data() {
			return {
				data:null,
				id:'',
				adressKey:'',
			}
		},
		mounted() {
			this.id = this.$route.query.id;
			this.adressKey = this.$route.query.key;
			
		},
		methods: {
			
			callBack(data) {
				console.log(data);
				this.data = data;
			},
			onBackPress(e){
				console.log("监听返回按钮事件",e);
				//正常返回页面
				uni.navigateTo({
				 	url:"/pages/member/member"
				})
				//返回主页面tabBar
				uni.switchTab({
					url:"/pages/index/index"
				})
				// 此处一定要return为true，否则页面不会返回到指定路径
				return true;
			},
			getCarId(){
				return this.$route.query.id;
			},
			backPage() {
				if(!this.data){
					uni.$u.toast('请选择一个地址');
					return;
				}
				uni.navigateBack({
					delta: 1, // 返回的页面数，如果 B 界面是 A 的直接下一个界面，则填写 1
					success: () => {
						uni.$emit('refreshAddress', this.data);
					},
				});
			},
			redirtAddLocation() {
				uni.navigateTo({
					url: "/pages/add-location/add-location?id=1",
				})
			},
			showErrorToast(toast_data) {
				this.$refs.uToast.show({
					...toast_data,
					complete() {
			
					}
				})
			}
		}
	}
</script>

<style>
	.location-title {
		margin-top: 5px;
		margin-bottom: 5px;
		padding: 10px 10px 10px 10px;
		background-color: #FFFFFF;

		.view {
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>