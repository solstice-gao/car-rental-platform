import request from '../utils/request.js'


const couponsService = {
	async queryAll() {
		const result = await request.get('/rentalCoupons/all');
		return result;
	},
	async receive(data){
		const result = await request.post('/rentalCouponsRecord/receive',data);
		return result;
	},
	async queryByCompany(data){
		const result = await request.post('/rentalCouponsCompany/queryByCompany',data);
		return result;
	}
}

export default couponsService;