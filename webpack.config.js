const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    mode: isProduction ? 'production' : 'development',
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: isProduction ? 'static/js/[name].[contenthash:8].js' : 'static/js/[name].js',
        chunkFilename: isProduction ? 'static/js/[name].[contenthash:8].chunk.js' : 'static/js/[name].chunk.js',
        assetModuleFilename: 'static/media/[name].[hash:8][ext]',
        clean: true,
        publicPath: '/',
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '.css'],
        alias: {
            '@/root': path.resolve(__dirname, 'src/system'),
            '@/components': path.resolve(__dirname, 'src/components'),
            '@/store': path.resolve(__dirname, 'src/system/store'),
            '@/typings': path.resolve(__dirname, 'src/typings'),
            '@/translations': path.resolve(__dirname, 'src/translations'),
            '@/modules': path.resolve(__dirname, 'src/modules'),
            '@/assets': path.resolve(__dirname, 'src/assets'),
            '@/utils': path.resolve(__dirname, 'src/utils'),
        },
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx|js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        presets: [['@babel/preset-react', { runtime: 'automatic' }], '@babel/preset-typescript'],
                    },
                },
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                auto: true,
                                localIdentName: '[name]__[local]--[hash:base64:5]',
                                namedExport: false,
                            },
                        },
                    },
                    'postcss-loader',
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg|ico)$/i,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 10000,
                    },
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
            inject: 'body',
            ...(isProduction && {
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
        }),
        ...(isProduction
            ? [
                  new MiniCssExtractPlugin({
                      filename: 'static/css/[name].[contenthash:8].css',
                      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
                  }),
              ]
            : []),
    ],
    optimization: {
        minimize: isProduction,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    parse: {
                        ecma: 8,
                    },
                    compress: {
                        ecma: 5,
                        warnings: false,
                        comparisons: false,
                        inline: 2,
                    },
                    mangle: {
                        safari10: true,
                    },
                    output: {
                        ecma: 5,
                        comments: false,
                        ascii_only: true,
                    },
                },
            }),
        ],
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    priority: -10,
                    chunks: 'all',
                },
            },
        },
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 3000,
        hot: true,
        historyApiFallback: true,
        open: true,
    },
    devtool: isProduction ? 'source-map' : 'eval-source-map',
};
