/**
 * Created by xingjia on 9/17/2015.
 */
(function() {
  'use strict';
  define(["app"], function(smc) {
    var mapper = {
      'danger': 'error'
    };
    return smc.filter('wordMapper', function () {
      return function (input) {
        return mapper[input] || input;
      };
    });
  });
})(this);
