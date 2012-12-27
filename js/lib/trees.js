'use strict';

define(['jquery'],
  function($) {

  var land = $('#game-area');

  var loadFruit = function() {
    var ttl = Math.floor(Math.random() * 3500);
    var left = Math.floor(Math.random() * 350)
    var top = Math.floor(Math.random() * 400);
    var fruit = $('<div class="tree2-prop fruit" style="top: ' +
      top + 'px; left: ' + left + 'px;"></div>');
    land.append(fruit);

    fruit.fadeIn(ttl);
    setTimeout(function() {
      fruit.fadeOut(function() {
        fruit.remove();
      });
    }, ttl);
  };

  var self = {
    generateFruit: function() {
      loadFruit();
    }
  };

  return self;
});
