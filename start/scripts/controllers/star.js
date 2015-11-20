(function () {
  'use strict';
  define(['app'], function (smc) {
    
    return smc.controller('StarCtrl', ['$scope', '$compile', '$sce','$state','$timeout', '$http', 'SMC_CONSTANTS',
      function ($scope, $compile,$sce,$state,$timeout, $http, SMC_CONSTANTS) {
        //
        function getRandomColor() {
          //totally 4 colors
          return Math.floor(Math.random() * 4) + 1;  
        };
        var colors = ['blue', 'green', 'rgb(255, 87, 0)', 'black', 'purple'];
        $scope.getColor = function(colorId) {
          return colors[colorId - 1];
        };
        
        //10 X 10 table
        $scope.rows = 10;
        $scope.columns = 10;
        
        $scope.clickBtn = function(ele) {
          var row = ele.$parent.$index;
          var col = ele.$index;
          
          //if one block is clicked, mark it and its neighbours as cleared
          markCellAndNeighbours(row, col);
          //move above blocks down
          compact();
          //then set cleared blocks to '0'
          cleanNegativeValue();
          //if there're empty columns, move their right blocks to left
          removeEmptyColumn();
          if(isAllDone()) {
            alert('done');
          }
          showCurrentStars();
        };
        $scope.init = function() {
          var stars = new Array($scope.rows);
          for (var i = 0; i < stars.length; i++) {
            stars[i] = new Array($scope.columns);
            for (var j = 0; j < stars[i].length; j++) {
              stars[i][j] = getRandomColor();
            }
          }
          $scope.stars = stars;
        };
        
        $scope.init();
        
        function showCurrentStars() {
          var ret = '';
          for(var row = 0;row<$scope.rows;row++) {
            ret += $scope.stars[row].join(',')+'\n'
          }
          console.error(ret);
        }
        function isAllDone() {
          for (var row = 0; row < $scope.rows; row++) {
            for (var col = 0; col < $scope.columns; col++) {
              if ($scope.stars[row][col] > 0) {
                return false;
              }
            }
          }
          return true;
        }
        //after all works done, set negative value to '0'
        //we use negative value to indicate one block is going to be cleared
        //if set to '0' directly, then I can't distinguish whether one block is lonely or has a just now pressed neighbour
        //for lonely block, no action, for block with just pressed neighbour, the block should be cleared too
        function cleanNegativeValue() {
          for (var row = 0; row < $scope.rows; row++) {
            for (var col = 0; col < $scope.columns; col++) {
              if ($scope.stars[row][col] < 0) {
                $scope.stars[row][col] = 0;
              }
            }
          }
        }
        
        //find out empty columns, move right side blocks to left
        function removeEmptyColumn() {
          for (var i = 0; i < $scope.columns - 1; i++) {
            if(isEmptyColumn(i)) {
              if(isRightSideEmpty(i)) {
                return;
              }
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
        
        //check whether current column is empty now
        //if empty, then move right blocks to left
        function isEmptyColumn(col) {
          for (var i = 0; i < $scope.rows; i++) {
            if ($scope.stars[i][col] > 0) {
              return false;
            }
          }
          return true;
        }
        
        //check whether the right side of current column is empty or not
        //if empty, then no need move right blocks to left
        function isRightSideEmpty(col) {
        	for (var i = col + 1; i < $scope.columns; i++) {
            if ($scope.stars[$scope.rows - 1][i] > 0) {
              return false;
            }
          }
        	return true;
        }
        
        //move above blocks down, and set value to '0', means the block is cleared
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
        
        //check whether there're non-empty block above me
        function hasMoreAbove(row, col) {
          for (var i = row - 1; i >= 0; i--) {
            if($scope.stars[i][col] > 0) {
              return true;
            }
          }
          return false;
        }
        
        //set me and my neighbours to negative value
        function markCellAndNeighbours(row, col) {
          var top = getNeighbour(row, col, 'top');
          var left = getNeighbour(row, col, 'left');
          var right = getNeighbour(row, col, 'right');
          var bottom = getNeighbour(row, col, 'bottom');
          if(top || left || right || bottom) {
            //I have neighbour, so set value to negative one, then will be set to '0' soon
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
        //if top/right/bottom/left value is same as me or negative to me, it's my neighbor
        //negative means, the neighbour is just pressed, the value will be changed to '0' soon
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
