'use strict';

define(['jquery', 'trees'],
  function($, trees) {

  var land = $('#game-area');

  var self = {
    generateFruit: function(tree) {
      for (var i = 0; i < parseInt(localStorage.getItem('mechanicalError-' + tree + '-remainder'), 10); i ++) {
        var top = Math.floor(Math.random() * 440);
        var left = Math.floor(Math.random() * 300);
        var fruit = $('<div class="tree-prop fruit" style="left: ' + left + 'px; top: ' + top + 'px;"></div>');
        land.append(fruit);
      }
    }
  };

  return self;
});
