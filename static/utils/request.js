let baseURL = process.env.SERVER_BASE_URL;
baseURL = '/api';

const request = {
	get(url, params) {
		const cookie = uni.getStorageSync('cookie');
		return new Promise((resolve, reject) => {
			uni.request({
				url: baseURL + url,
				method: 'GET',
				withCredentials: false,
				header: {
					'Content-Type': 'application/json',
				},
				data: params,
				success: (res) => {
					console.log('获取数据：', res.data);
					if(res.data.code===403){
						uni.$u.toast('登录已失效，请重新登录');
						uni.navigateTo({
							url: "/pages/login/login",
						})
					}
					resolve(res.data); // Resolve the Promise with data
				},
				fail: (err) => {
					console.log('请求失败：', err);
					reject(err); // Reject the Promise with error
				}
			});
		});
	},
	post(url, data) {
		return new Promise((resolve, reject) => {
			uni.request({
				url: baseURL + url,
				method: 'POST',
				header: {
					'Content-Type': 'application/json'
				},
				data: JSON.stringify(data),
				success: (res) => {
					console.log('提交数据：', res.data);
					resolve(res.data); // Resolve the Promise with data
				},
				fail: (err) => {
					console.log('提交失败：', err);
					reject(err); // Reject the Promise with error
				}
			});
		});
	}
};

export default request;