'use strict';

var _mm = require('util/mm.js');

var product = {
	//1.获取商品列表
	getProductList: function(listParam, resolve, reject){
		_mm.request({
			//获取商品列表
			url: _mm.getServerUrl('/product/list.do'),
			data: listParam,
			method: 'POST',
			success: resolve,
			error: reject
		})
	}
}

module.exports = product;
