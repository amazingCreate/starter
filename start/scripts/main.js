'use strict';
var debugPath = {
  'jquery':'../lib/jquery/dist/jquery',
  'jquery-ui':'../lib/jquery-ui/jquery-ui',
  'angular': '../lib/angular/angular',
  'angular-ui-router': '../lib/angular-ui-router/release/angular-ui-router',
  'angular-route': '../lib/angular-route/angular-route',
  'angular-sanitize' : '../lib/angular-sanitize/angular-sanitize',
  'angular-cookies' : '../lib/angular-cookies/angular-cookies',
  'angular-resource' : '../lib/angular-resource/angular-resource',
  'angular-animate' : '../lib/angular-animate/angular-animate',
  'bootstrap-all': '../lib/bootstrap/dist/js/bootstrap',
  'ui.bootstrap': '../lib/angular-bootstrap/ui-bootstrap-tpls',
  'i18next': '../lib/i18next/i18next',
  'ng-i18next': '../lib/ng-i18next/dist/ng-i18next',
  'strophe':'../lib/strophejs/strophe',
};

var runtimePath = {
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
};

var debugMode = false;
var hash = window.location.hash;
if (window.location.href.indexOf('debug=1')>0) {
  debugMode = true;
}
var path = debugMode ? debugPath: runtimePath;
require.config({
  // enforceDefine: true,
  waitSeconds: 0,
  paths: path,
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
    'ui.bootstrap': ['angular', 'bootstrap-all']
  },
  priority: [
    'angular'
  ]
});

require([
  'jquery',
  'angular',
  'router'
], function($,angular, router) {
  angular.element( document ).ready(function() {
        angular.bootstrap(document, ['smc']);
    });
});
