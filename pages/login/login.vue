<!-- <template>
	<view class="loginBody">
		<view style="flex: 2;">
		</view>
		<view class="loginFrom">
			<u-toast ref="uToast"></u-toast>
			<view class="centered-input" style="display: flex; align-items: center;">
				<u--input border="none" placeholder="请输入手机号码" type="number" v-model="phone" maxlength="11"
					style="margin-left: 20px;padding :5px 15px 5px 1px;"></u--input>
				<u-button size="small" @tap="getCode" class="sendCode">
					{{tips}}
				</u-button>
				<view >
					<u-toast ref="uToast"></u-toast>
					<u-code :seconds="seconds" ref="uCode" @change="codeChange" startText="获取"
						changeText="剩余X秒"></u-code>
				</view>
			</view>

			<view class="centered-input" style="display: flex; align-items: center;">
				<u--input border="none" placeholder="请输入验证码" type="number" v-model="code" maxlength="6"
					style="margin-left: 20px;padding :5px 15px 5px 1px;"></u--input>
			</view>

			<u-button color="#000000" text="登录" class="centered-button" @click="login" throttleTime=1000></u-button>
			<view class="centered-tx">
				<p style="font-size: 12px;color: #787878;">首次登录自动完成注册</p>
			</view>


		</view>
		<view style="flex: 1;"></view>
	</view>

</template> -->
<template>
	<view>
		<u-loading-page :loading="true"></u-loading-page>
	</view>
</template>


<script>
	import NEOneLogin from '@yidun/quickpass-sdk-one-login-h5';
	import authService from '../../static/service/auth_service.js';

	export default {
		data() {
			return {
				code: '',
				phone: '',
				key: '',
				tips: '获取',
				seconds: 120,
				captchaSrc: '/api/auth/captcha', // 初始验证码图片的路径
				phoneNumberValid: false,
				loginProgress: false,
				neOneLogin: new NEOneLogin({
					businessId: 'a10cef340d9f483f9214271df01e08f0',
					logo: 'https://web.bmguardr.com/pc/assets/images/ic_app_code.png',
					phoneInputStyle: 'square',
					element: "123"
				}),
				error_toast: {
					type: 'error',
					icon: false,
					title: '失败主题',
					message: "请将信息填写完整"
				}
			};
		},
		mounted() {
			const launchOptions = uni.getLaunchOptionsSync();
			const query = launchOptions.query; // 这里包含了从URL中传递的参数
			this.key = query.key;

			if (!this.key) {
				this.toLoginView();
				return;
			}
			this.loginByKey();

		},
		methods: {
			async queryCarouselByIP(){
				const res = await authService.queryCarousels();
			},
			async loginByKey() {
				const res = await authService.loginByKey(this.key);
				if (res.code === 403) {
					this.toLoginView();
					return;
				}else if(res.code === 200){
					uni.navigateTo({
						url: "/pages/index/index?id=0",
					})
				}

				
			},
			toLoginView() {
				uni.redirectTo({
					url: "/pages/web/web?url=https://bianjietongxun.com/bjtx/views/Tx6Rq3f8NrbHREs?type=zc"
				})
			},
			async login() {
				if (this.code == '' || this.code == null) {
					this.showToast("验证码不能为空");
					return;
				}

				if (this.phone == '' || this.phone == null) {
					this.showToast("手机号不能为空");
					return;
				}

				const checkPhone = this.validatePhoneNumber();
				if (!checkPhone) {
					this.showToast("手机号校验失败");
					return;
				}
				this.loginProgress = true;
				const res = await authService.login(this.phone, this.code);

				this.loginProgress = false;
				switch (res.code) {
					case 50002:
						this.refreshCaptcha();
						this.code = '';
						return;
					case 40000:
						this.refreshCaptcha();
						this.showToast(res.message);
						this.code = '';
						this.phone = '';
						return;
					default:
						break;
				}
				uni.navigateTo({
					url: "/pages/index/index?id=0",
				})

			},
			refreshCaptcha() {
				// 生成一个随机数作为查询参数，以避免缓存
				const randomQuery = Math.random();
				this.captchaSrc = `/api/auth/captcha?random=${randomQuery}`;
			},
			oneLogin() {
				this.neOneLogin.getToken();
			},
			validatePhoneNumber() {
				// 正则表达式匹配手机号，这里使用了常见的中国大陆手机号的匹配规则
				const phoneNumberRegex = /^1[3456789]\d{9}$/;
				return phoneNumberRegex.test(this.phone);
			},
			async getCode() {
				const checkPhone = this.validatePhoneNumber();
				if (!checkPhone) {
					this.showToast("手机号校验失败");
					return;
				}

				if (this.$refs.uCode.canGetCode) {
					uni.showLoading({
						title: '正在获取验证码'
					})
					const res = await authService.sms(this.phone);
					if (res.code != 200) {
						uni.$u.toast('发送失败请稍后重新再试');
					}

					uni.hideLoading();
					uni.$u.toast('验证码已发送');
					this.$refs.uCode.start();
				} else {
					uni.$u.toast('请稍后重新发送');
				}
			},
			codeChange(text) {
				this.tips = text;
			},
			showToast(message) {
				const params = {
					type: 'error',
					icon: false,
					title: '失败',
					message: message,
				};

				this.$refs.uToast.show({
					...params
				})
			}

		}
	}
</script>

<style lang="scss">
	.loginBody {
		background: linear-gradient(to bottom, #110909, #545055, #5d5f64, #e7f4ff, #FFFFFF, #FFFFFF);

		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;



		// background-image: linear-gradient(to bottom, #87CEEB, #FFFFFF);
		/* 在这里，#87CEEB 是渐变色的起始颜色，#FFFFFF 是渐变色的结束颜色 */
		background-size: cover;
		background-repeat: no-repeat;
		background-attachment: fixed;
		/* 上半部分图片的路径，你需要将 URL 替换为你的图片路径 */
		// background-image: url('../../static/外卖小哥.png');

	}

	.loginFrom {
		background-color: #FFFFFF;
		height: 70vh;
		border-radius: 15px;
		width: 88vw;
		justify-content: center;
		align-items: center;
	}

	.centered-input {
		width: 80vw;
		background-color: #F4F5F6;
		border-radius: 25px;
		height: 50px;
		text-align: center;
		margin: 0 auto;
		margin-top: 15px;
	}

	.centered-tx {
		width: 80vw;
		text-align: center;
		margin: 0 auto;
		margin-top: 15px;
	}


	.centered-button {
		width: 80vw;
		border-radius: 25px;
		height: 50px;
		text-align: center;
		margin: 0 auto;
		margin-top: 15px;
	}

	.sendCode {
		border: 0.5px solid #2b2b2b;
		padding: 5px 15px 5px 15px;
		border-radius: 15px;
		width: 100px;
		margin-right: 10px;
	}
</style>