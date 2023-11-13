<script>
	import {
		eventBus
	} from './static/utils/eventBus.js'
	export default {
		onLaunch: function() {},
		onShow: function() {
			uni.$emit('app-lifecycle-changed', 'show');
		},
		onHide: function() {
			uni.$emit('app-lifecycle-changed', 'hide');
		}
	}
</script>

<style lang="scss">
	/* 写在第一行，style标签需要加入lang="scss" */
	@import "uview-ui/index.scss";

	::-webkit-scrollbar {
		display: none;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
	}
</style>