(function () {
  'use strict';
  define(['app', 'services/xmpp'], function (smc) {
    var STATE_NEVERCONNECTED = "neverConnected";
    var STATE_CONNECTED = "connected";
    var STATE_DISCONNECTED = "disconnected";
    
    return smc.controller('RoomListCtrl', ['$scope', '$compile', '$sce','$state','$timeout', '$http', 'SMC_CONSTANTS', 'XMPPService',
      function ($scope, $compile,$sce,$state,$timeout, $http, SMC_CONSTANTS, XMPPService) {
        $scope.rooms = [];
        function initRooms(){
          for(var i=0;i<20;i++) {
            $scope.rooms.push({
              roomName: 'beginner:'+i, 
              description:"for new beginner for new beginnerfor new beginnerfor new beginner"+i, 
              notificationNumber: i%2==0?i:0,
              selected:false,
              state:i%3==0?STATE_NEVERCONNECTED:i%3==1?STATE_CONNECTED:STATE_DISCONNECTED
            });
          }
        }
        initRooms();
        
        $scope.selectRoom = function(roomName) {
           for(var i=0;i<$scope.rooms.length;i++) {
             if($scope.rooms[i]['roomName'] == roomName) {
               $scope.rooms[i]['selected'] = true;
             } else {
               $scope.rooms[i]['selected'] = false;
             }
           }
        };
        //
    }]);
  });
})(this);
