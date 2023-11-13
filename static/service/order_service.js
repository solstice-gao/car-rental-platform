import request from '../utils/request.js'

const statusDescriptions = {
  0: "待支付",
  2: "Processing",
  1: "已支付",
  "-1": "已取消",
  "-2": "已退款"
};

const orderService = {
	async getAlipayUrl(order) {
		const result = await request.post('/rentalOrder/preOrder',order);
		return result.data;
	},
	
	async queryOrderStatus(order) {
		const result = await request.post('/rentalOrder/queryOrderStatus',order);
		return result.data;
	},
	
	async getOrderList() {
		const result = await request.get('/rentalOrder/getOrders');
		return result.data;
	},
	
	
	async getOrderInfoById(orderId) {
		const result = await request.get('/rentalOrder/queryInfoById/'+orderId);
		return result.data;
	},
	
	
	getOrderStatusDesc(status){
		 return statusDescriptions[status] || "未知状态";
	}	
}


export default orderService;