'use strict';
var _mm = require('util/mm.js');
var _address = {}
module.exports = _address;

var _address = {
	//获取地址列表
	getAddressList: function(resolve, reject){
		_mm.request({
			url: _mm.getServerUrl('/shipping/list.do'),
			data: {
				pageSize:50
			},
			method: 'POST',
			success: resolve,
			error: reject
		})
	},
	
}