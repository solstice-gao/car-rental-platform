<template>
	<view class="wrap">
		<home v-if="barIndex == 0"></home>
		<account v-else></account>
		<view class="u-page__item">
			<!-- <u-gap height="100"></u-gap> -->
			<u-tabbar :value="barIndex" @change="name => barIndex = name" :fixed="true" :placeholder="true"
				:safeAreaInsetBottom="true" activeColor="#d92333">
				<u-tabbar-item text="首页" icon="home">
				</u-tabbar-item>
				<u-tabbar-item text="我的" icon="account"></u-tabbar-item>
			</u-tabbar>
		</view>
	</view>

</template>

<script>
	import home from '../../components/home/home.vue'
	import account from '../../pages/account/account.vue'
	import request from '../../static/utils/request.js'
	import authService from '../../static/service/auth_service.js'
	export default {
		components: {
			home,
			account
		},
		data() {
			return {
				barIndex: 0,
			}
		},
		onLoad() {

			this.login();
		},
		mounted() {
			this.barIndex = parseInt(this.$route.query.id);
		},
		methods: {
			
			changePage(index) {
				this.barIndex = index;
			},
			async login() {

			},
			setCurr(e) {
				let thisCurr = e.detail.current || e.currentTarget.dataset.index || 0;
				this.barIndex = thisCurr;
			}
		}
	}
</script>

<style>
	.wrap {
		display: flex;
		flex-direction: column;
		width: 100%;

	}

	.wrap .scroll-box {
		flex: 1;
		overflow: scroll;
	}


	.u-page {
		padding: 0;

		&__item {

			&__title {
				color: $u-tips-color;
				background-color: $u-bg-color;
				padding: 15px;
				font-size: 15px;

				&__slot-title {
					color: $u-primary;
					font-size: 14px;
				}
			}

			&__slot-icon {
				width: 17px;
				height: 17px;
			}
		}
	}
</style>