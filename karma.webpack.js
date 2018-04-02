var webpack = require('webpack');

module.exports = {
    output: {
        filename: './src/test/[name].bundle.js',
        publicPath: './',
        libraryTarget: 'amd'
    },
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                loaders: ['ts-loader', 'angular2-template-loader'],
                exclude: /(node_modules)/
            },
            {
            test: /\.scss$/,
            use: ["to-string-loader", "style-loader", "css-loader", "sass-loader"]
            },
            // html
            {
            test: /\.html$/,
            use: [
                {
                loader: 'html-loader'
                }
            ]
            },
            // images
            {
            test: /\.(jpe?g|gif|png)$/,
            use: 'file-loader?emitFile=false&name=[path][name].[ext]'
            }
        ],
        loaders: [
            { loader: 'raw', test: /\.(css|html)$/ },
            { exclude: /node_modules/, loader: 'ts', test: /\.ts$/ }
        ]
    },
    externals: [
        function (context, request, callback) {
            if (/^dojo/.test(request) ||
                /^dojox/.test(request) ||
                /^dijit/.test(request) ||
                /^esri/.test(request)
            ) {
                return callback(null, "amd " + request);
            }
            callback();
        }
    ],
    devtool: 'source-map'
};