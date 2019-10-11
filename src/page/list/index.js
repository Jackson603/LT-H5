'use strict';

require('./index.css');

require('@/common/nav/index.js');
require('@/common/header/index.js');
var _mm = require('util/mm.js');

var templateIndex = require('./index.string');
var _product = require('service/product-service.js');

var page ={
	//初始化
	init:function(){
		this.onLoad();
		this.bindEvent();
	},
	//加载数据
	onLoad: function(){
		this.loadList();
	},
	bindEvent: function(){
		
	},
	//加载list数据
	loadList: function(){
		
	}
}
$(function(){
	page.init();
})