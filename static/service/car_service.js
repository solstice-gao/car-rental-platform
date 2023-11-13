import request from '../utils/request.js'
const carService = {
	async queryById(id) {
		const result = await request.get('/rentalCars/'+id);
		return result;
	},
}


export default carService;