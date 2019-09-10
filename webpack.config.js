var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var config = {
	entry: {
		'index':'./src/page/index/index.js',
		'login':'./src/page/login/index.js'
	},
	output:{
		path: path.resolve(__dirname, 'dist'),
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
			//loader:"style-loader!css-loader"
			}
		]
	},
	plugins:[
		new ExtractTextPlugin("css/[name].css")
	]
}

module.exports = config;