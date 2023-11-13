<template>
	<view>
		<u-navbar title="商家经营信息" :autoBack="true"  style="height:50px">
		</u-navbar>
		<view class="car-send-by">
			<u-row customStyle="margin-bottom: 15pxmargin-top:1px" justify="space-between" gutter="10">
				<u-col span="2">
					<image :src="companyInfo.companyIcon" class="logo-image" />
				</u-col>
				<u-col span="10">
					<view>
						<span style="font-size: 18px;">{{companyInfo.companyName}}</span>
					</view>
				</u-col>
			</u-row>
			<u-row customStyle="margin-bottom: 15px;" justify="space-between" gutter="10">
				<p>根据相关法律要求，商家经营相关资质公示如下:</p>
			</u-row>
			<u-row customStyle="margin-bottom: 15px" justify="space-between" gutter="10">
				<image :src="companyInfo.businessLicense" style="width: 100vw;height: 30vh;"></image>
			</u-row>
			<u-row customStyle="margin-bottom: 15px" justify="space-between" gutter="10">
				<view style="background-color: #f7f7f7;width: 100vw;padding: 10px;border-radius: 15px;color: #686868;">
					<p>资质说明</p>
					<p>1.以上营业执照信息来源商家申报上传，具体以市场监管部门登记为准</p>
					<p>2.经营者需确保信息真实有效，平台也将定期核查，如与实际图片信息不符，请联系当地市场监管部门、平台客服、商家客服进行更新</p>
				</view>
			</u-row>
		</view>
	</view>
</template>

<script>
	import companyService from '../../static/service/company_service.js'
	export default {
		data() {
			return {
				companyInfo:{}
			}
		},
		mounted() {
			this.getCompanyInfo()
		},
		methods: {
			async getCompanyInfo(){
				const companyId = this.$route.query.companyId;
				const data = await companyService.queryInfoByCompanyId(companyId);
				this.companyInfo = data.data;
			}
		}
	}
</script>

<style scoped>
	.logo-image {
		width: 35px;
		height: 35px;
	}
	.car-send-by {
		margin-bottom: 5px;
		padding: 2px 20px 10px 20px;
		background-color: #FFFFFF;
	
		.view {
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>
