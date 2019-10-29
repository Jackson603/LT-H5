'use strict'

var _mm = require('util/mm.js');

var _order = {
	// 1、获取商品列表
	getProductList: function(resolve, reject){
		_mm.request({
			// 获取商品列表
			url: _mm.getServerUrl('/order/get_order_cart_product.do'),
			methods: 'POST',
			success: resolve,
			error: reject
		})
	},
	// 2、提交订单
	createOrder: function(orderInfo, resolve, reject){
		_mm.request({
			// 获取商品列表
			url: _mm.getServerUrl('/order/create.do'),
			data: orderInfo,
			methods: 'POST',
			success: resolve,
			error: reject
		})
	},
	// 3、加载订单列表
	getOrderList: function(listParam, resolve, reject){
		_mm.request({
			// 获取商品列表
			url: _mm.getServerUrl('/order/list.do'),
			data: listParam,
			methods: 'POST',
			success: resolve,
			error: reject
		})
	}
}

module.exports = _order;
