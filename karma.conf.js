var path = require('path');
var webpackConfig = require('./webpack.config.js');

delete webpackConfig.entry;
webpackConfig.devtool = 'inline-source-map';

// TODO: figure out the instrumentation and sourcemap issues
// webpackConfig.module.preLoaders = [{
//     test: /\.js(x)$/,
//     exclude: /(node_modules)/,
//     loader: 'istanbul-instrumenter'
// }];

// workaround for module resolve issues, 
// see: https://github.com/airbnb/enzyme/issues/302
webpackConfig.externals = {
  'cheerio': 'window',
  'react/addons': true,
  'react/lib/ExecutionEnvironment': true,
  'react/lib/ReactContext': true
};

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha'],


        // list of files / patterns to load in the browser
        files: [
            'test-main.js'
        ],


        // list of files to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            // we don't need the coverage preprocessor because we're instrumenting the files with webpack
            'test-main.js': ['webpack', 'sourcemap']
        },

        webpack: webpackConfig,

        webpackMiddleware: {
            noInfo: true
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'coverage'],

        coverageReporter: [
            { type: 'text-summary' },
            { type: 'html', dir: 'coverage' }
        ],

        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    });
};