(function() {
  'use strict';

  define([ "angular", 'angular-route', 'angular-ui-router', 'angular-cookies',
      'angular-sanitize', 'angular-resource', 'angular-animate',
      'ui.bootstrap', 'ng-i18next','perfectScrollbar','perfectScrollbarJQuery'], function(angular) {
    /**
     * @ngdoc overview
     * @name chatClientApp
     * @description # chatClientApp
     * 
     * Main module of the application.
     */
    var smcModule = angular.module('smc', [ 'ngAnimate', 'ngCookies',
        'ngResource', 'ui.router', 'ngRoute', 'ngSanitize', 'ui.bootstrap',
        'jm.i18next' ]);
    smcModule.run(function(){
      //window.Ps = require('perfectScrollbar');
      //require('perfectScrollbarJQuery');
    });
    // Register all constants here
    smcModule.constant('SMC_CONSTANTS', {
      'CHAT_HTMLLIZE_PREFIX' : 'htmlize-',
      'CHAT_ALERT_SUCCESS' : 'success',
      'CHAT_ALERT_ERROR' : 'danger',
      'CHAT_ALERT_WARNING' : 'warning',
      'CHAT_ALERT_INFO' : 'info'
    });

    angular.module('jm.i18next').config(
        [ '$i18nextProvider', function($i18nextProvider) {
          $i18nextProvider.options = {
            cookieName : 'c_i18n',
            fallbackLng : 'en',
            lng : 'zh-CN',
            ns : 'i18n',
            load : 'current',
            resGetPath : './resources/locales/__lng__/__ns__.json',// './resources/locales/{{ns}}/{{lng}}/i18n.json',
            preLoad : [ 'en-US' ],
          }
        } ]);

    return smcModule;
  });

})(this);
