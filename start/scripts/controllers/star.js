(function () {
  'use strict';
  define(['app'], function (smc) {
    
    return smc.controller('StarCtrl', ['$scope', '$compile', '$sce','$state','$timeout', '$http', 'SMC_CONSTANTS',
      function ($scope, $compile,$sce,$state,$timeout, $http, SMC_CONSTANTS) {
        //
        function getRandomColor() {
          return Math.floor(Math.random() * 4) + 1;  
        };
        var colors = ['red', 'green', 'yellow', 'blue', 'purple'];
        $scope.getColor = function(colorId) {
          return colors[colorId - 1];
        };
        
        $scope.rows = 10;
        $scope.columns = 10;
        var stars = new Array($scope.rows);
        for (var i = 0; i < stars.length; i++) {
          stars[i] = new Array($scope.columns);
          for (var j = 0; j < stars[i].length; j++) {
            stars[i][j] = getRandomColor();
          }
        }
        $scope.stars = stars;
        
        $scope.clickBtn = function(ele) {
          var row = ele.$parent.$index;
          var col = ele.$index;
          markCellAndNeighbours(row, col);
          compact();
          removeEmptyColumn();
//          var ret = '';
//          for(var row = 0;row<$scope.rows;row++) {
//            console
//            for(var col=0;col<$scope.columns;col++) {
//              
//            }
//          }
        };
        function removeEmptyColumn() {
          for (var i = 0; i < $scope.columns - 1; i++) {
            if(isEmptyColumn(i)) {
              for (var row = 0; row < $scope.rows; row++) {
                for (var col = i; col < $scope.columns - 1; col++) {
                  $scope.stars[row][col] = $scope.stars[row][col+1];
                }
                $scope.stars[row][col] = 0;
              }
              i--;
            }
          }
        }
        function isEmptyColumn(col) {
          for (var i = 0; i < $scope.rows; i++) {
            if ($scope.stars[i][col] > 0) {
              return false;
            }
          }
          return true;
        }
        function compact() {
          for (var col = 0; col < $scope.columns; col++) {
            for (var row = $scope.rows - 1; row > 0; row--) {
              if($scope.stars[row][col] > 0) {
                continue;
              }
              if(hasMoreAbove(row, col)) {
                moveAboveDown(row, col);
                row++;
                continue
              } else {
                $scope.stars[row][col] = 0;
              }
            }
          }
        }
        function moveAboveDown(row, col) {
          for (var i = row; i > 0; i--) {
            $scope.stars[i][col] = $scope.stars[i-1][col];
          }
          $scope.stars[i][col] = 0;
        }
        function hasMoreAbove(row, col) {
          for (var i = row - 1; i >= 0; i--) {
            if($scope.stars[i][col] > 0) {
              return true;
            }
          }
          return false;
        }
        function markCellAndNeighbours(row, col) {
          var top = getNeighbour(row, col, 'top');
          var left = getNeighbour(row, col, 'left');
          var right = getNeighbour(row, col, 'right');
          var bottom = getNeighbour(row, col, 'bottom');
          if(top || left || right || bottom) {
            $scope.stars[row][col] = -1*($scope.stars[row][col]);
          }
          if(top && $scope.stars[top[0]][top[1]] > 0) {
            markCellAndNeighbours(top[0], top[1]);
          }
          if(left && $scope.stars[left[0]][left[1]] > 0) {
            markCellAndNeighbours(left[0], left[1]);
          }
          if(right && $scope.stars[right[0]][right[1]] > 0) {
            markCellAndNeighbours(right[0], right[1]);
          }
          if(bottom && $scope.stars[bottom[0]][bottom[1]] > 0) {
            markCellAndNeighbours(bottom[0], bottom[1]);
          }
        }
        function getNeighbour(row, col, position) {
          var currentValue = $scope.stars[row][col];
          if(position == 'top') {
            row = row -1;
            if(row<0) {
              return null;
            }
          } else if (position == 'bottom') {
            row = row +1;
            if(row>=$scope.rows) {
              return null;
            }
          } else if (position == 'left') {
            col = col -1;
            if(col<0) {
              return null;
            }
          } else if (position == 'right') {
            col = col +1;
            if(col>=$scope.columns) {
              return null;
            }
          }
          if($scope.stars[row][col] == currentValue || ($scope.stars[row][col] + currentValue) == 0) {
            return [row, col];
          }
        }
        //
    }]);
  });
})(this);
