'use strict';

define(['jquery'],
  function($) {

  var land = $('#game-area');

  var loadGem = function() {
    var ttl = Math.floor(Math.random() * 3000);
    var left = Math.floor(Math.random() * 350)
    var top = Math.floor(Math.random() * 400);
    var gem = $('<div class="cave-prop gem" style="top: ' + top + 'px; left: ' + left + 'px;"></div>');
    land.append(gem);

    gem.fadeIn(ttl);
    setTimeout(function() {
      gem.fadeOut(function() {
        gem.remove();
      });
    }, ttl);
  };

  var self = {
    generateGems: function() {
      loadGem();
    }
  };

  return self;
});
