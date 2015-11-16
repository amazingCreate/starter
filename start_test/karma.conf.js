// Karma configuration
// Generated on Mon Nov 02 2015 17:38:46 GMT+0800 (China Standard Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../',

    // frameworks to use
    // npm install karma-requirejs -g  
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'requirejs'],

    // list of files / patterns to load in the browser
    files: [
        'start/lib/jquery/dist/jquery.min.js', 
        {
            pattern: 'start/lib/angular-mocks/angular-mocks.js', included: false
        },
        {
            pattern: 'start/lib/**/*.min.js', included: false
        },
        {
            pattern: 'start/lib/strophejs/strophe.min.js', included: false
        }, 
        {
            pattern: 'start/scripts/**/*.js', included: false
        },
        {
            pattern: 'start_test/spec/**/*-spec.js', included: false
        },
        'start_test/test-main.js'
    ],

    // list of files to exclude
    exclude: [
      'start/lib/**/require.min.js',
      'start/scripts/main.js'
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    	'start/scripts/**/*.js':'coverage'
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress','coverage'],
    
	  coverageReporter: {
	      dir: 'start_test/coverage',
	      reporters: [
	      	{ type: 'html', subdir: 'report-html' },
	      	{ type: 'teamcity', subdir: '.', file: 'teamcity.txt' },
	      	{ type: 'text-summary', subdir: '.', file: 'text-summary.txt' }
	      ]
	  },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    /*plugins: [
      'karma-jasmine',
      'karma-mocha-reporter'
    ],*/

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    //browsers: ['PhantomJS'],
    browsers: ['Chrome'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultanous
    concurrency: Infinity
  })
}
