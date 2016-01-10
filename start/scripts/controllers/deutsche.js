(function () {
  'use strict';
  define(['app','controllers/deutsche_daily'], function (smc, deutsche) {
    
    return smc.controller('DeutschCtrl', ['$scope', '$compile', '$sce','$state','$timeout', '$http', 'SMC_CONSTANTS',
      function ($scope, $compile,$sce,$state,$timeout, $http, SMC_CONSTANTS) {
        function getRandomSentenceIndex() {
          return Math.floor(Math.random() * $scope.allSentences.length);  
        };
        $scope.generateQuestion = function() {
          if($scope.allSentences.length == 0) {
            $scope.finished = true;
            $scope.currentQuestion = 'done';
            return;
          }
          $scope.currentIndex = getRandomSentenceIndex();
          $scope.currentQuestion = $scope.allSentences[$scope.currentIndex][0];
          $scope.currentAnswer = $scope.allSentences[$scope.currentIndex][1]
        };
        
        $scope.checkAnswer = function() {
          if($scope.typedAnswer == $scope.currentAnswer) {
            $scope.answeredSentences.push({'question':$scope.currentQuestion,'answer':$scope.currentAnswer,'timestamp':new Date()});
            $scope.allSentences.splice($scope.currentIndex, 1);
            $scope.typedAnswer = '';
            $scope.showAnswer = false;
            $scope.generateQuestion();
          } else {
            $scope.showAnswer = true;
          }
        };
        
        $scope.forceNext = function() {
          $scope.answeredSentences.push({'question':$scope.currentQuestion,'answer':$scope.currentAnswer,'timestamp':new Date()});
          $scope.allSentences.splice($scope.currentIndex, 1);
          $scope.typedAnswer = '';
          $scope.showAnswer = false;
          $scope.generateQuestion();
        };
        
        $scope.init = function() {
          $scope.allSentences = deutsche.getDeutsche();
          $scope.answeredSentences = [];
          $scope.generateQuestion();
        }
        $scope.init();
      }
    ]);
    
  });
})(this);
