(function () {
  'use strict';
  define(['app', 'services/xmpp'], function (smc) {
    return smc.controller('LaunchChatCtrl', ['$scope', '$compile', '$sce','$state','$timeout', '$http', 'SMC_CONSTANTS', 'XMPPService',
      function ($scope, $compile,$sce,$state,$timeout, $http, SMC_CONSTANTS, XMPPService) {
        $scope.startChat = function() {
          XMPPService.init('','','',999);
          XMPPService.connect('falcon','1','');
          //alert(this.question);
        }
    }]);
  });
})(this);
