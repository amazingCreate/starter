(function () {
  'use strict';
  define(['app', 'services/xmpp'], function (smc) {
    return smc.controller('LaunchChatCtrl', ['$scope', '$compile', '$sce','$state','$timeout', '$http', 'SMC_CONSTANTS', 'XMPPService',
      function ($scope, $compile,$sce,$state,$timeout, $http, SMC_CONSTANTS, XMPPService) {
        $scope.isConnecting = false;
        $scope.onConnecting = function(scope, status) {
          if (status == Strophe.Status.CONNECTED) {
            $timeout(function(){
              $scope.isConnecting = false;
            },500);
          } else {
            //if disconnected, show error message
            $timeout(function(){
              $scope.isConnecting = true;
            },500);
          }
        };
        XMPPService.addConnectingStatusListener($scope.onConnecting, $scope);
        $scope.$on('$destroy', function(){
          XMPPService.removeConnectingStatusListener($scope.onConnecting, $scope);
          console.error('launch chat destroy');
        });
        
        //click startChat button
        $scope.startChat = function() {
          $scope.isStarting = true;
          $timeout(function(){
            $scope.isStarting = false;
            alert('ticket is created\n'+$scope.question);
          },1000);
        }
    }]);
  });
})(this);
