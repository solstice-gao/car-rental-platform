<template>
	<div class="floating-window" :style="{ bottom: '60px', right: '30px' }">
		<!-- 悬浮窗口内容 -->
		<u--image src="https://cdn.bianjietongxun.com/P/2023/10/08/100200894/IOO.png" shape="circle" width="40"
			@click="isWindowOpen = true" height="40">
		</u--image>
		<u-modal title="联系客服" :show="isWindowOpen" :content="content" closeOnClickOverlay @close="closeWindow">
			<u-button text="拨打客服热线" shape="circle"  @click="makePhoneCall(4006810095)" type="primary" icon="server-man"></u-button>
			<u-button text="拨打投诉监督" shape="circle" slot="confirmButton" @click="makePhoneCall(4006810095)" type="warning" icon="server-fill" style="margin-bottom: 20px;"></u-button>
		</u-modal>
	</div>
</template>

<script>
	export default {
		name: "kefu",
		data() {
			return {
				top: 100, // 初始垂直位置
				left: 100, // 初始水平位置
				isWindowOpen: false, // 控制悬浮窗口显示,
				content:'客服热线：4006810095'
			};
		},
		methods: {
			openWindow() {
				this.isWindowOpen = true;
			},
			closeWindow() {
				this.isWindowOpen = false;
			},
			makePhoneCall(phoneNumber) {
			      window.location.href = `tel:${phoneNumber}`;
			},
		},
	}
</script>

<style scoped>
	.floating-window {
		position: fixed;
		/* background-color: rgba(255, 255, 255, 0); */
		background-color: #FFFFFF;
		border-radius: 50%;
		padding: 5px;
		box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
		z-index: 9999;
		cursor: move;
	}

	.window-content {
		padding: 10px;
	}

	button {
		position: absolute;
		top: 5px;
		right: 5px;
		cursor: pointer;
	}

	.rounded-image {
		height: 40px;
		width: 40px;
		border-radius: 50%;
		/* 将边框半径设置为50%以实现圆角 */
	}
</style>