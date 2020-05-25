const path = require('path');
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = function (env, argv) {
    const isEnvDevelopment = argv.mode === 'development' || !argv.mode;
    const isEnvProduction = argv.mode === 'production';
    return {
        mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
        devtool: isEnvProduction ? 'source-map' : isEnvDevelopment && 'cheap-module-source-map',
        entry: './src/index.js',
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist')
        },
        devServer: {
            contentBase: './dist',
            historyApiFallback: true,
            hot: true,
        },
        plugins: [
            // new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: "./public/index.html",
                favicon: './public/favicon.ico',
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    keepClosingSlash: true,
                    minifyJS: true,
                    minifyCSS: true,
                    minifyURLs: true,
                },
            }),
            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new MiniCssExtractPlugin({
                filename: '[name].[contenthash:8].css',
                chunkFilename: '[name].[contenthash:8].chunk.css',
                options: {
                    outputPath: '/dist/css/'
                }

            }),
        ],

        // resolve: {
        //     alias: {
        //         '@': path.resolve('src')
        //     }
        // },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    use: ['babel-loader'],
                    exclude: __dirname + ' node_modules'
                },
                {
                    test: /\.js$/,
                    exclude: '/node_modules/',
                    enforce: "pre",
                    use: "eslint-loader"
                },
                {
                    test: /\.css$/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],

                },
                {
                    test: [/\.(woff|woff2|eot|ttf|otf)$/],
                    loader: "file-loader",
                    options: { name: '[name]_[hash:4].[ext]', outputPath: 'assets/' },
                },
                {
                    test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
                    loader: "url-loader",
                    options: { limit: 10000, outputPath: 'file' }
                },



            ]
        },


    }
}