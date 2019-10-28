const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
	mode: 'development',
	entry: './src/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	plugins: [
		// 热更新，只更新修改的部分，而不是整个文件
		new webpack.HotModuleReplacementPlugin(),
		new htmlWebpackPlugin({
			// 指定打开的页面路径
		  template: path.join(__dirname, './httpserver/html/home/home.html')
		}),
		new VueLoaderPlugin()
	  ],
	devServer: {
		contentBase: './html',
		hot: true,
		port: 3000
	},
	module: {
		rules: [
			// test正则不要添加符号
			{test: /\.css$/, use: ['style-loader', 'css-loader']},
			{test: /\.(jpg|png|woff2|woff|ttf|svg)$/, use: ['url-loader?limit=3000&name=[hash:8]-[name].[ext]']},
			{test: /\.js$/, use: ['babel-loader'], exclude: /node_modules/ },
			{test: /\.vue$/, use: ['vue-loader']},
		]
	}
};