// Karma configuration
// Generated on Thu Jun 14 2018 23:35:11 GMT+0300 (EEST)

module.exports = config => {
  config.set({

    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'jasmine-matchers'],

    
    // list of files / patterns to load in the browser
    files: [
      './src/*.spec.js'
    ],


    // list of files / patterns to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
     
      './src/*.spec.js': ['webpack']
    },

    webpack: {
      mode: 'development',
      devtool: 'eval',
    },

    webpackServer: {
      noInfo: true
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha'],

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DEBUG,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,
    usePolling: true,
    atomic_save: false,

    // start these browsers   
    browsers: ['Chrome'],

   

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  });
};
