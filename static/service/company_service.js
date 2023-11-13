import request from '../utils/request.js'
const companyService = {
	async queryAll(ip) {
		const result = await request.get('/rentalCompany/queryAll', {
			"ip": "17604515707",
		});
		return result;
	},
	async queryByCompanyId(companyId) {
		const result = await request.get('/rentalCompany/queryByCompanyId', {
			"companyId": companyId,
		});
		return result;
	},
	async queryInfoByCompanyId(companyId) {
		const result = await request.get('/rentalCompany/'+companyId);
		return result;
	},
}


export default companyService;