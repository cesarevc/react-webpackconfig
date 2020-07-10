const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');


module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.[contentHash].js'
    },
    optimization: {
        splitChunks: {
			chunks: 'all',
			name: false,
		},
		runtimeChunk: true,
    },
    devServer: {
        port: 7700
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)/,
                exclude: /node_modules/,
                use: { 
                    loader: 'babel-loader'
                },
                
            },
            {
                test: /\.(jpg|jpeg|png|gif)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'url-loader',
                        options: { name: 'img/[name].[ext]', limit: 10000 },
                    },
                ],
            },
            {
                test: /\.(eot|ttf|woff|woff2|svg|otf)$/,
                use: [{ loader: 'file-loader' }],
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader', 
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            hash: true,
			chunksSortMode: 'none',
			minify: {
                removeComments: true,
				collapseWhitespace: true,
			},
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
			chunkFilename: 'css/[name].[contenthash:8].chunk.css',
        }),
        new MomentLocalesPlugin({
            localesToKeep: ['es'],
		})
    ],
    resolve:{
        extensions: ['.js', '.jsx']
    }
}