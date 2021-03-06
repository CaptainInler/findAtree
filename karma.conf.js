// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

var webpackConfig = require('./karma.webpack.js');

module.exports = function (config) {
  config.set({
    basePath: './',
    frameworks: ['jasmine', 'dojo'],
    plugins: [
      require('karma-jasmine'),
      require('karma-webpack'),
      require('karma-dojo'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular/cli/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      reports: ['html', 'lcovonly'],
      fixWebpackSourcePaths: true
    },
    angularCli: {
      environment: 'dev'
    },
    webpack: webpackConfig,
    files: [{
      pattern: './src/**/*.html',
      included: false,
      watched: false
    }, {
      pattern: './src/**/*.scss',
      included: false,
      watched: false
    }, {
      pattern: './src/**/*.ts',
      included: false,
      watched: false
    }, {
      pattern: 'karma-test-shim.js',
      included: false
    },
      'karma-test-main.js'
    ],
    preprocessors: {
      './karma-test-shim.js': ['webpack']
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  });
};
