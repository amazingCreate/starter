(function () {
  'use strict';
  define(['app', 'services/xmpp'], function (smc) {
    return smc.controller('ConnectOFCtrl', ['$scope', '$compile', '$sce','$state','$timeout', '$http', 'SMC_CONSTANTS', 'XMPPService',
      function ($scope, $compile,$sce,$state,$timeout, $http, SMC_CONSTANTS, XMPPService) {
        $scope.startConnect = function() {
          $scope.isConnecting = true;
          XMPPService.init('','','',999);
          XMPPService.addConnectingStatusListener($scope.onConnecting, $scope);
          XMPPService.connect('admin','11','');
        };
        //click reconnect button
        $scope.reconnect = function() {
          $scope.isConnecting = true;
          XMPPService.connect('falcon','1','');
        };
        $scope.onConnecting = function(scope, status) {
          if(status == Strophe.Status.CONNECTING) {
            $scope.isConnecting = true;
          } else if (status == Strophe.Status.CONNECTED) {
            //if connected, show 'Start Chat' panel
            $state.go('launchstart');
          } else {
            $timeout(function(){
              //I found, if 'isConnecting' is changed too fast(switch between 'false' and 'true), 
              //then angular seems can't change UI immediately
              $scope.isConnecting = false;
            },500);
          }
        };
        $scope.$on('$destroy', function(){
          //before leaving the page, remove listeners
          //for example, if called $state.go('launchstart'), or press backspace key
          XMPPService.removeConnectingStatusListener($scope.onConnecting, $scope);
          console.error('connect OF destroy');
        });
        
        //connect to openfire after page is loaded
        $scope.startConnect();
    }]);
  });
})(this);
