'use strict';

require('./index.css');
require('@/common/nav-simple/index.js');
require('node_modules/font-awesome/css/font-awesome.min.css');
var _user = require('service/user-service.js');
var _mm = require('util/mm.js');

//表单里的错误提示
	var formError = {
		show: function(errMsg){
			$('.error-item').show().find('.err-msg').text(errMsg);
		},
		//隐藏的方法
		hide: function(){
			$('.error-item').hide().find('.err-msg').text('');
		}
	}

var page = {
	init: function () {
		this.bindEvent();
	},
	//绑定事件的函数
	bindEvent: function(){
		var _this = this
		//登录按钮点击
		$('#submit').click(function(){
			_this.submit();
		})
		//如果按下回车键，也进行提交
		$('.user-content').keyup(function(e){
			//keyCode == 13 表示回车键
			if(e.keyCode === 13)
			_this.submit()		
		})
	},

	//提交表单函数
	submit: function(){
		var _this = this
		//从表单上获取的实际数据
		var formData = {
			username: $.trim($('#username').val()),
			password: $.trim($('#password').val())
		};
		//表单验证结果
		var validateResult = _this.formValiDate(formData);
		
		//前端验证成功
		if(validateResult.status){
			console.log('表单验证成功，继续服务器端验证!');
			//提交数据到服务器
			_user.login(formData,function(res){
				//对code
				window.location.href =  _mm.getUrlParam('redirect') || './index.html';
			}, function(errMsg){
				//错误提示
				formError.show(errMsg);			
			});
			}else{ 
				//前端验证失败
			formError.show(validateResult.msg);	
		}
	},

	//[前端] 表单验证函数的开发
	formValiDate: function(formData){
		//空的结果对象0
		var result = {
			status: false,
			msg: ''
		};
		
		//验证用户名
		if(!_mm.validate(formData.username,'require')){
			result.msg = '用户名不能为空';
			return result;
		}
		//验证密码
		if(!_mm.validate(formData.password,'require')){
			result.msg = '密码不能为空';
			return result;
		}
		//如果通过验证，则返回正确的提示
		result.status = true;
		result.msg = '验证通过';
		//返回验证的结果对象
		return result;
	}
};
$(function(){
	page.init()
});
