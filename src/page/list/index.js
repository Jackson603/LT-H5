'use strict';

require('./index.css');
require('@/common/nav/index.js');
require('@/common/header/index.js');
var _mm = require('util/mm.js');

var templateIndex = require('./index.string');
var _product = require('service/product-service.js');
// var Pagination = require('util/pagination/index.js');

var page ={
	data: {
		listParam: {
			keyword: _mm.getUrlParam('keyword') || '',
			categoryId: _mm.getUrlParam('categoryId') || '',
			orderBy: _mm.getUrlParam('orderBy') || 'default',
			pageNum: _mm.getUrlParam('pageNum') || 1,
			pageSize: _mm.getUrlParam('pageSize') || 5
		}
	},
	//初始化
	init:function(){
		this.onLoad();
		this.bindEvent();
	},
	//加载数据
	onLoad: function(){
		this.loadList();
	},
	//事件绑定
	bindEvent: function(){
		var _this = this;
		//排序的点击事件
		$('.sort-item').click(function(){
			//缓存变量
			var $this = $(this);
			//每次点击之后，都应该将页数初始化为1
			_this.data.listParam.pageNum = 1;
			//点击默认排序
			if($this.data('type') === 'default'){
				//已经是active样式
				if($this.hasClass('active')){
					return;
					//其他
				}else{
					$this.addClass('active').siblings('.sort-item')
					.removeClass('active asc desc');
					_this.data.listParam.orderBy = 'default';
				}
				//点击价格排序
			}else if($this.data('type') === 'price'){
				//active class的处理
				$this.addClass('active');
				//升序和降序的处理
				if(!$this.hasClass('asc')){
					$this.addClass('active').siblings('.sort-item')
					 .removeClass('active asc desc');
					 $this.addClass('asc').removeClass('desc');
					 //价格升序
					 _this.data.listParam.orderBy = 'price_asc';
				}else{
					 $this.addClass('desc').removeClass('asc');
					//价格降序
					 _this.data.listParam.orderBy = 'price_desc';
				}
			}
			//重新加载列表
			_this.loadList();
		})
	},
	//加载list数据
	loadList: function(){
		var _this = this,
		listhtml = '',
		listParam =  this.data.listParam,
		$pListCon = $('.p-list-con'); //找到容器
		$pListCon.html('<div class="loading"></div>')
		
		//因为keyword和categoryId是共存的，但是我们只需要一个即可
		//删除参数中不必要的字段
		//delete关键字需要在【非严格模式】下执行，严格模式下报错
		listParam.categoryId ? (delete listParam.keyword) : (delete listParam.categoryId);
		
		//请求接口  其中res是服务器响应给我们的信息对象
		_product.getProductList(listParam, function(res){
				// console.log(res);
				//先对数据进行处理，然后再进行渲染
				for(var i = 0; i < res.list.length; i++){
					//如果mainImage的值为空，就把这个元素删除，不显示这件商品
					if(!res.list[i].mainImage){
						res.list.splice(i, 1);
					}
					//添加正则表达式
					if(!(/\.(gif|png|jpg|jpeg).??.*$/.test(res.list[i].mainImage))){
						res.list.splice(i, 1);
					}
				}
				//渲染页面
				listhtml = _mm.renderHtml(templateIndex, {
					list:res.list
				});
				//等加载完毕的时候，再覆盖掉
				$pListCon.html(listhtml);
			}, function(){
				_mm.errorTips();
		});
	}

}

$(function(){
	page.init();
})