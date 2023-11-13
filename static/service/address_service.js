import request from '../utils/request.js'
const adressService = {
	async queryAll(carId) {
		const result = await request.get('/rentalCarAddress/queryAll?id='+carId);
		return result.data;
	},
	async add(adress) {
		const result = await request.post('/rentalUserAddress/add',adress);
		return result;
	},
}


export default adressService;