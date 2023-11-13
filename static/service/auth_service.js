import request from '../utils/request.js'



const authService = {
	async login(phone, code) {
		const login = await request.get('/auth/register', {
			"phoneNum": phone,
			"code": code
		});
		return login;
	},
	async loginByKey(key) {
		const login = await request.get('/auth/hzwl-user', {
			"key": key
		});
		return login;
	},
	async sms(phone) {
		const sms = await request.get('/auth/sendSms', {
			"phone": phone
		});
		return sms;
	},
	async getLoginInfo(){
		const login = await request.get('/auth/tokenInfo');
		return login;
	},
	
	async queryCarousels(){
		const carousel = await request.get('/rentalCarousel/queryByIP');
		return carousel;
	},
	
	logout() {
		return new Promise((resolve, reject) => {

		});
	}
};

export default authService;