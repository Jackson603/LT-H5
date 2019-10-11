'use strict';

var _mm = require('util/mm.js');

getProductList: function(listParam , resolve, reject){
	_mm.require({
		url: _mm.getServerUrl('./product/list.do'),
		data: listParam,
		method: 'POST',
		success: resolve,
		error: reject
	})
}
var _product = {

}

module.exports = _product;
