const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	mode: 'development',
	// 多页面配置
	entry: {
		'static/js/login/login': './src/html/login/login.js',
		'static/js/home/home': './src/html/home/home.js',
		'static/js/dirtree/dirtree': './src/html/dirtree/dirtree.js'
		
	},
	output: {
		// name对应entry中的 key
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
	},
	plugins: [
		// 热更新，只更新修改的部分，而不是整个文件
		new webpack.HotModuleReplacementPlugin(),
		//new CleanWebpackPlugin(),
		new htmlWebpackPlugin({
		  filename: 'static/html/login/login.html',
		  template: path.join(__dirname, 'src/html/login/login.html'),
		  inject: 'body',
		  minify: {

		  },
		  // chunks配置成entry中的 对应的 key 才能自动映入js文件 
		  chunks: ['static/js/login/login']
		}),
		// 多页面配置多个
		new htmlWebpackPlugin({
			// 指定打开的页面路径
			filename: 'static/html/home/home.html',
			template: path.join(__dirname, 'src/html/home/home.html'),
			inject: 'body',
			minify: {
  
			},
			chunks: ['static/js/home/home']
		}),
		new htmlWebpackPlugin({
			filename: 'static/html/dirtree/dirtree.html',
			template: path.join(__dirname, 'src/html/dirtree/dirtree.html'),
			inject: 'body',
			minify: {
  
			},
			chunks: ['static/js/dirtree/dirtree']
		}),
		new VueLoaderPlugin(),
		new ExtractTextPlugin("static/css/styles.css", {
			allChunks: true
		}),//打包后的css文件名
	  ],
	devServer: {
		contentBase: './dist/static/html',
		hot: true,
		port: 3000,
		watchContentBase: true,
	},
	module: {
		rules: [
			// test正则不要添加符号
			//{test: /\.css$/, use: ['style-loader', 'css-loader']},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
				  fallback: "style-loader",
				  use: "css-loader"
				})
			},
			{test: /\.(jpg|png)$/, use: ['url-loader?limit=3000&name=[hash:8]-[name].[ext]']},
			//{test: /\.(ttf|woff|woff2|svg)$/, use: ['url-loader?limit=3000&name=[hash:8]-[name].[ext]']},
			{test: /\.(ttf|woff|woff2|svg)$/, use: [
				{
				  loader: "file-loader",
				  options: {
					name: "[name]-[hash:5].[ext]",
					limit: 5000, // fonts file size <= 5KB, use 'base64'; else, output svg file
					publicPath: "../../static/fonts",// 引用的位置,,dev-server中使用相对位置，，部署时要使用绝对位置
					outputPath: "static/fonts/"
				  }
				}
			  ]},
			{test: /\.js$/, use: ['babel-loader'], exclude: /node_modules/ },
			{test: /\.vue$/, use: ['vue-loader']},
		]
	}
};