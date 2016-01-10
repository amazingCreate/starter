(function () {
  'use strict';
  define(['app', 'angular', 'controllers/connectOF', 'controllers/launchchat', 'controllers/roomlist', 'controllers/star', 'controllers/deutsche'], function (smc, angular) {
    smc.config(function ($stateProvider, $urlRouterProvider) {
      // if there is no specific URL, go the the main window
      $urlRouterProvider.when('/', '/deutsche');
      $urlRouterProvider.otherwise('/deutsche');

      //if use $state.go(), the backspace seems doesn't work well, always show a blank url like 'index.html#'
      //so use ui-sref="launchstart", then backspace works well
      $stateProvider
      .state('deutsche', {
        url:'/deutsche',
        views: {
          '': {
            templateUrl: 'views/deutsche.html',
            controller: 'DeutschCtrl',
            constrollerAs: 'vm',
            onEnter: ['$timeout', function($timeout){
              //
            }]
          }
        }
      })
      .state('chart', {
        url:'/chart',
        views: {
          '': {
            templateUrl: 'views/chart.html'
          }
        }
      })
      .state('star', {
        url:'/star',
        views: {
          '': {
            templateUrl: 'views/star.html',
            controller: 'StarCtrl',
            constrollerAs: 'vm',
            onEnter: ['$timeout', function($timeout){
              //
            }]
          }
        }
      })
      .state('roomlist', {
        url:'/roomlist',
        views: {
          '': {
            templateUrl: 'views/roomlist.html',
            controller: 'RoomListCtrl',
            constrollerAs: 'vm',
            onEnter: ['$timeout', function($timeout){
              //
            }]
          }
        }
      })
      .state('launchbtn', {
        url:'/launchbtn',
        templateUrl: 'views/launch-btn.html',
        onEnter: ['$timeout', function($timeout){
          $timeout(function() {
            var width = $('#showChatBtn').outerWidth();
            var height = $('#showChatBtn').outerHeight();
            window.parent && window.parent.postMessage(["setSize", (width+30)+"#"+height], "*"); 
          }, 500);
        }]
      })
      .state('launchconnecting', {
        url:'/launchconnecting',
        templateUrl: 'views/launch-connecting.html',
        controller: 'ConnectOFCtrl',
        constrollerAs: 'vm',
        onEnter: ['$timeout', function($timeout){
          $timeout(function() {
            var width = $('#showChatBtn').outerWidth();
            var height = $('#showChatBtn').outerHeight();
            window.parent && window.parent.postMessage(["setSize", (350)+"#"+280], "*"); 
          }, 500);
        }]
      })
      .state('launchstart', {
        url:'/launchstart',
        templateUrl: 'views/launch-start.html',
        controller: 'LaunchChatCtrl',
        constrollerAs: 'vm',
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

