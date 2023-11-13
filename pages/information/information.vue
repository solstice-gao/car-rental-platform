<template>
	<view style="background-color: #f0f0f0;">
		<u-navbar title="车辆详情" :autoBack="true">
		</u-navbar>
		<carinfo :id="id" style="margin-top: 50px;"></carinfo>
	</view>
</template>

<script>
	import carinfo from '../../components/car-info/car-info.vue';
	export default {
		components: {
			carinfo,
		},
		data() {
			return {
				id:''
			}
		},
		methods: {
			
		},
		mounted() {
			this.id = this.$route.query.id;
		},
		onLoad(option){
			this.id = option.id;
		}
	}
</script>

<style>

</style>
