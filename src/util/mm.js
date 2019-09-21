'use strict'
var Hogan = require("hogan.js");
var conf = {
	serverHost : ''
}

var _mm = {
	//数据请求方法
	request : function(param){
		//保存this,防止this指针指向不明
		var _this = this;
		$.ajax({
			type 	 : param.method || 'get',
			url  	 : param.url    || '',
			dataType : param.type   || 'json',
			data  	 : param.data   || '',
			//请求成功，返回200 
			success : function(res){	
				//请求成功
				if(0 === res.status){
					typeof param.success === 'function' && param.success(res.data,res.msg);
				}else if (10 === res.status){
					//没有登录状态，统一去登录
					_this.doLogin();
				}else if (1 === res.status){
					//报错
					typeof param.error === 'function' && param.error(res.msg);
				}
			},
			//返回404 503
			error : function(err){
				typeof param.error === 'function' && param.error(err.statusText); 
 			}
		});
	},
	//统一跳转到登录页面
	doLogin: function(){
		window.location.href = './user-login.html?redirect=' + 
		encodeURIComponent(window.location.href);
		
	},
	getServerUrl: function(path){
		return conf.serverHost + path;
	},
	//获取url参数
	//www.baidu.com/product/list?keyword=xxx&page=1
	//在上面的
	getUrlParam: function(name){
		var reg    = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
		var result = window.location.search.substr(1).match(reg);
		return result ? decodeURIComponent(result[2]) : null;	
	},
	renderHtml: function(htmlTemplate,data){
		//Hogan编译模板
		var template = Hogan.compile(htmlTemplate);
		//Hogan渲染模板
		var result   = template.render(data);
		//将渲染的结果返回
		return result;
	},
	successTips: function(msg){
		alert(msg || '操作成功');
	},
	errorTips: function(msg){
		alert(msg || '哪里不对了');
	},
	validate: function(value,type){
		var value = $.trim(value);
		if('require'=== type){
			//将value值强转成Boolean类
			return !!value;
		}
		//手机号验证
		if('phone'=== type){
			return /^1\d{10}$/.test(value);
			}
		if('email'=== type){
			return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
			}
	},
	//统一跳转到登录页面
	goHome: function(){
		window.location.href = './index.html';
		}
	};
 module.exports = _mm;
