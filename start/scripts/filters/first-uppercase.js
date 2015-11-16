/**
 * Created by xingjia on 9/17/2015.
 */
(function() {
  'use strict';
  define(["app"], function(smc) {
    return smc.filter('firstUpper', function () {
      return function (input) {
        return input.charAt(0).toUpperCase() + input.substr(1).replace(/[A-Z]/g, ' $&');
      };
    });
  });
})(this);
