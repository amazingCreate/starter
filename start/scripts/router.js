(function () {
  'use strict';
  define(['app', 'angular', 'controllers/launchchat'], function (smc, angular) {
    smc.config(function ($stateProvider, $urlRouterProvider) {
      // if there is no specific URL, go the the main window
      $urlRouterProvider.when('/', '/launchbtn');
      $urlRouterProvider.otherwise('/launchbtn');

      //if use $state.go(), the backspace seems doesn't work well, always show a blank url like 'index.html#'
      //so use ui-sref="launchstart", then backspace works well
      $stateProvider
        .state('launchbtn', {
          url:'/launchbtn',
          views: {
            '': {
              templateUrl: 'views/launch-btn.html',
              controller: 'LaunchChatCtrl',
              constrollerAs: 'vm'
            }
          },
          onEnter: ['$timeout', function($timeout){
            $timeout(function() {
              var width = $('#showChatBtn').outerWidth();
              var height = $('#showChatBtn').outerHeight();
              window.parent && window.parent.postMessage(["setSize", (width+30)+"#"+height], "*"); 
            }, 500);
          }]
        })
        .state('launchstart', {
          url:'/launchstart',
          views: {
            '': {
              templateUrl: 'views/launch-start.html',
              controller: 'LaunchChatCtrl',
              constrollerAs: 'vm'
            }
          },
          onEnter: ['$timeout', function($timeout){
            $timeout(function() {
              var width = $('#launchChatPanel').outerWidth();
              var height = $('#launchChatPanel').outerHeight();
              window.parent && window.parent.postMessage(["setSize", (350)+"#"+280], "*"); 
            }, 500);
          }]
        })
      ///////////////
    });
  });
})(this);

