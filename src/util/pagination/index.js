'use strict';

require('./index.css');
var _mm = require('util/mm.js');
var templatePagination = require('./index.string');

var Pagination = function(){
	var _this = this;
	this.defaultOption = {
		container: null,
		pageNum : 1,   //默认显示第一页
		pageRange : 3,  //每页显示3条数据
		onSelectPage : null
	}
	//事件的处理
$(document).on('click','.pg-item',function(){
	var $this = $(this);
	//对于active和disable按钮点击不做处理
	if($this.hasClass('active') || $this.hasClass('disabled')){
		return;
	}
	typeof _this.option.onSelectPage === 'function'
	? _this.option.onSelectPage($this.data('value')) : null;
	
	
	});
}
Pagination.prototype.render = function(userOption){

	//合并选项
	this.option = $.extend({}, this.defaultOption, userOption);
	//判断容器是否是合法的jQuery对象
	if(!(this.option.container instanceof jQuery)){
		return;
	}
	//判断是否只有一页，只有一页的情况就不用显示分页效果
	if(this.option.pages <= 1) {
		return;
	}
	//渲染分页内容
	this.option.container.html(this.getPaginationHtml());	
}
//|上一页| 1 2 3 4 =5= 6 |下一页| 5/6
Pagination.prototype.getPaginationHtml = function(){
	//获取分页的html
	var html = '',
	option = this.option,
	pageArray = [],
	start = (option.pageNum - option.pageRange > 0)
	? (option.pageNum - option.pageRange) : 1,
	end = (option.pageNum + option.pageRange < option.pages)
			?(option.pageNum + option.pageRange) : option.pages;

	//上一页按钮的数据
	pageArray.push({
		name : '上一页',
		value : this.option.prePage,
		//如果有前面的页码，那么、disabled就是false
		disabled : !this.option.hasPreviousPage
	});
	//数字按钮的处理
	
	for(var i = start; i <= end; i++){
		pageArray.push({
			name : i,
			value : i,
			active: (i === option.pageNum),
		})
	}
	//下一页按钮的数据
	pageArray.push({
		name : '下一页',
		value : option.nextPage,
		//如果有后的页码，那么、disabled就是false
		disabled : !option.hasNextPage
	});
	//开始渲染
	html = _mm.renderHtml(templatePagination, {
		pageArray: pageArray,
		pageNum: option.pageNum,
		pages: option.pages
	})
	return html;
	}
module.exports = Pagination;