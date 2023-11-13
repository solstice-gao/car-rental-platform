<template>
	<view>
		<u-list @scrolltolower="scrolltolower">
			<u-swiper :list="list1" height="160"></u-swiper>
			<kefu />
			<coupon></coupon>
			<u-list-item v-for="data in car_datas" :key="data.company_id">
				<car-company :car='data'></car-company>
			</u-list-item>
		</u-list>
	</view>
</template>

<script>
	import CarCompany from '@/components/home/car-company/car-company.vue'
	import Coupon from '@/components/coupon/coupon.vue'
	import companyService from '../../static/service/company_service.js'
	import authService from '../../static/service/auth_service.js'
	import Kefu from '@/components/kefu.vue'
	export default {
		components: {
			// 注册自定义组件
			'car-company': CarCompany,
			'coupon': Coupon,
			'kefu': Kefu
		},
		name: "home",
		data() {
			return {
				list1: [
					'https://cdn.bianjietongxun.com/P/2023/10/02/130222039/EXP.jpg',
					'https://cdn.bianjietongxun.com/P/2023/10/02/130222039/EXP.jpg',
					'https://cdn.bianjietongxun.com/P/2023/10/02/130222039/EXP.jpg',
				],
				car_datas: []
	};
	},
	mounted() {
			this.fetchData();
			this.queryCarouselByIP();
		},
		methods: {
			async queryCarouselByIP() {
				const res = await authService.queryCarousels();
				if(res.code == 200){
					this.list1 = res.data;
				}
			},
			click(index) {
				var obj = this.list[index];
				this.$refs.uToast.success(`点击了${obj.title}`);
			},
			async fetchData() {
				// const login = await authService.login();
				const res = await companyService.queryAll("192.168.1.1")
				this.car_datas = res.data;
			}
		}
	}
</script>

<style scoped>

</style>