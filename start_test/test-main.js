var allTestFiles = [];
var TEST_REGEXP = /(spec|start_test1)\.js$/i;

// Get a list of all the test files to include
Object.keys(window.__karma__.files).forEach(function(file) {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    // If you require sub-dependencies of test files to be loaded as-is (requiring file extension)
    // then do not normalize the paths
    var normalizedTestModule = file.replace(/^\/base\/|\.js$/g, '');
    normalizedTestModule = "../../" + normalizedTestModule;
    allTestFiles.push(normalizedTestModule);
  }
});

require.config({
  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: '/base/start/scripts',
  
  // dynamically load all test files
  deps: allTestFiles,

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start,waitSeconds: 0,
  paths: {
    'jquery':'../lib/jquery/dist/jquery.min',
    'jquery-ui':'../lib/jquery-ui/jquery-ui.min',
    'angular': '../lib/angular/angular.min',
    'angular-ui-router': '../lib/angular-ui-router/release/angular-ui-router.min',
    'angular-route': '../lib/angular-route/angular-route.min',
    'angular-sanitize' : '../lib/angular-sanitize/angular-sanitize.min',
    'angular-cookies' : '../lib/angular-cookies/angular-cookies.min',
    'angular-resource' : '../lib/angular-resource/angular-resource.min',
    'angular-animate' : '../lib/angular-animate/angular-animate.min',
    'bootstrap-all': '../lib/bootstrap/dist/js/bootstrap.min',
    'ui.bootstrap': '../lib/angular-bootstrap/ui-bootstrap-tpls.min',
    'i18next': '../lib/i18next/i18next.min',
    'ng-i18next': '../lib/ng-i18next/dist/ng-i18next.min',
    'strophe':'../lib/strophejs/strophe.min',
    'angular-mocks': '../lib/angular-mocks/angular-mocks'
  },
  shim: {
    'jquery-ui': ['jquery'],
    'angular' : {'exports' : 'angular', deps: ['jquery']},
    'angular-ui-router': ['angular'],
    'angular-route': ['angular'],
    'angular-cookies': ['angular'],
    'angular-sanitize': ['angular'],
    'angular-resource': ['angular'],
    'angular-animate': ['angular'],
    'angular-mocks': {
      'deps':['angular'],
      'exports':'angular.mock'
    },
    'i18next': {
      'deps': ['angular'],
      'exports': 'i18next'
    },
    'ng-i18next': {
      'deps': ['i18next'],
      'exports': 'ng-i18next'
    },
    'bootstrap-all': {
      'deps': ['jquery'],
      init: function (bs) {
        var tt = $.fn.tooltip.noConflict();
        $.fn.bstooltip = tt;
      }
    },
    'ui.bootstrap': ['angular', 'bootstrap-all'],
  },
  priority: [
    'angular'
  ]
});
