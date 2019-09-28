'use strict'

require('./index.css');

var _mm = require('util/mm.js');

//通用页面头部
var herder = {
	init: function(){
		this.onLoad();
		this.bindEvent();
		
	},
	//定义绑定事件的方法
	bindEvent: function(){
		var _this = this;
		//点击【搜索按钮】的时候做搜索提交
		$('.search-btn').click(function(){
			//做搜索提交
			_this.searchSubmit();
		})
		//输入【回车】的时候做搜索提交    e表示Enter 事件对象
		$('.search-input').keyup(function(e){
			//如果按下的是回车键
			if(e.keyCode === 13){
				//也做搜索提交
				_this.searchSubmit();
			}
		})	
	},
	//加载方法
	onLoad: function(){
		//关键字回填
		var keyword = _mm.getUrlParam('keyword');
	//如果keyword存在则回填至输入框
		if(keyword){
		//在输入框中显示当前搜索的词汇keyword
		$('.search-input').val(keyword);
		}
	},
	//实现搜索提交的方法
	searchSubmit: function(){
		//对关键字去空白字符处理
		var keyword = $.trim($('#search-btn').val());
		//如果提交搜索的时候有keyword，跳转到list页面
		if(keyword){
			alert("哈哈")
			window.location.href = './list.html?keyword' + keyword;
		}else{
			alert("嘻嘻")
			//如果keyword为空,直接返回首页
			_mm.goHome();
		}
	}
}

herder.init();