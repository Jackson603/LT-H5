var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('Html-webpack-plugin');
//接口字符串
var str = new Buffer('aHR0cDovL3Rlc3QuaGFwcHltbWFsbC5jb20v', 'base64');
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

var getHtmlConfig = function(name){
	return{
		//对那个html文件进行打包
			template:'./src/view/'+ name +'.html',
			//打包以后的路径和文件
			filename:'view/'+ name +'.html',
			//自动注入
			inject:true,
			//哈希值
			hash:true,
			chunks:['common',name]
	}
}

var config = {
	entry: {
		'common':['./src/page/common/index.js'],
		'index':'./src/page/index/index.js',
		'user-login':'./src/page/user-login/index.js'
	},
	
	output:{
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/dist',
		filename: 'js/[name].js'
	},
	
	externals:{
		'jquery' :'window.jQuery'
	},
	/*optimization:{
		//抽取公共模块的对象
		splitChunks:{
			//缓存组
			cacheGroups:{
			//commons表示公共的模块
				commons:{
			//立即会生成独立模块base.js文件
					name:'base',	
					chunks:'initial',
					minChunks:2,
					minSize:0
				}
			}
		}
	},*/
	module:{
		rules:[
			{
				test:/\.css$/,
				//loader:ExtractTextPlugin.extract;
				loader: ExtractTextPlugin.extract({
				fallback:"style-loader",
				use:"css-loader"
				})
			},
			{
				test:/\.(gif|png|jpg|woff|svg|eot|ttf).??.*$/,
				loader:'url-loader?limit=100&name=resource/[name].[ext]'
			}
			
		]
	},
	
	plugins:[
		new ExtractTextPlugin("css/[name].css"),
		new HtmlWebpackPlugin(getHtmlConfig('index')),
		new HtmlWebpackPlugin(getHtmlConfig('user-login'))
	],
	
	resolve: {
		alias: {
			util : path.resolve(__dirname, 'src/util'),
			"@": path.resolve(__dirname, 'src/page'),
			node_modules: path.resolve(__dirname, 'node_modules'),
			service: path.resolve(__dirname, 'src/service')
		}	
	},
	
	devServer: {
		port : 8088,
		inline : true,
		//配置代理实现跨域OK！
		//当访问localhost:8088/**/*.do的时候就跳转到
		//【网络接口】 + "**/*.do"
		proxy: {
			"**/*.do": {
				target: str.toString(),
				changeOrigin:true
			}
		}
	}
}
//如果是开发环境，那么添加一个数组元素
if('dev' === WEBPACK_ENV) {
	config.entry.common.push('webpack-dev-server/client?http://localhost:8088');
}

module.exports = config;