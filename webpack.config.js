var path = require('path');
var webpack = require("webpack");

module.exports = function (env) {
  var minimize = false;
  var htmlLoaderOptions = {};
  if (env) {
    minimize = env.minimize;
    htmlLoaderOptions = {
      minimize: false
    };
  }
  var config = {
    entry: {
      polyfills: './src/polyfills.ts',
      main: './src/main.ts',
      vendor: './src/vendor.ts'
    },
    output: {
      filename: './dist/[name].bundle.js',
      libraryTarget: "amd"
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', 'json']
    },
    devServer: {
      contentBase: __dirname,
      inline: true
    },
    module: {
      rules: [
        // typescript
        {
          test: /\.ts?$/,
          loaders: ['ts-loader', 'angular2-template-loader'],
          exclude: /(node_modules)/
        },
        // css
        {
          test: /\.css$/,
          use: ["to-string-loader", "css-loader"]
        },
        // html
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: htmlLoaderOptions
            }
          ]
        },
        // images
        {
          test: /\.(jpe?g|gif|png)$/,
          use: 'file-loader?emitFile=false&name=[path][name].[ext]'
        }
      ]
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: ['src','vendor', 'polyfills'],
        minChunks: Infinity
      })
    ],
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

/*   if (minimize) {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
      beautify: false, //prod
      sourceMap: true,
      output: {
        comments: false
      }, //prod
      mangle: {
        except: ['$', 'require'],
        screw_ie8: true,
        keep_fnames: true
      }, //prod
      compress: {
        screw_ie8: true,
        warnings: false,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
        negate_iife: false // we need this for lazy v8
      }
    }));
  } */

  return config;
}