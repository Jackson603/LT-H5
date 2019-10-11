'use strict'
require('./index.css');
require('@/common/nav/index.js');
require('@/common/header/index.js');
var _mm = require('util/mm.js');

require('util/swiper/swiper-3.3.1.min.css');
require('util/swiper/swiper-3.3.1.min.js');

 
 var templateBanner = require('./banner.string');
 
 var bannerHtml = _mm.renderHtml(templateBanner);
 $('.banner-con').html(bannerHtml);
 
 var mySwiper = new Swiper('.swiper-container', {
 	autoplay: 2000, //可以选选项，自动滑动
	//手动滑动之后，依然可以自动轮番
 	autoplayDisableOnInteraction: false,
 	//分页器
 	pagination: '.swiper-pagination',
 	//环路(不影响自动轮播)
 	loop: true
 	});





//测试个人中心页
//navSide.init({
//	name: 'user-center'
//});

//navSide.init({
//	name: 'about'
//});



//_mm.request({
//	//url: './xx.do',  //错误接口
//	url: '/product/list.do?keyword=1',
//	success: function(res){
//		console.log("这是我们从网络接口中获取的数据:",res);
//	},
//	error: function(errMsg){
//		console.log(errMsg);
//	}
//});

//console.log(_mm.getUrlParam('test'));

//提供模板
//var html = '<div>{{ data }}</div>';
////提供数据
//var data = {
//	data: 123
//}
//console.log(_mm.renderHtml(html,data));

