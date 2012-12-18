'use strict';

define(['jquery'],
  function($) {

  var land = $('#game-area');

  var loadBubbles = function() {
    var top = Math.floor(Math.random() * 400);
    var padding = Math.floor(Math.random() * 30);
    var bubble = $('<div class="pond-prop bubble" style="top: ' + top +
      'px; padding: ' + padding + 'px;"></div>');
    land.append(bubble);

    bubble.animate({
      left: '450px'
    }, 10500, function() {
      bubble.remove();
    });
  };

  var loadFish = function() {
    var speed = Math.floor(Math.random() * 2500);
    var top = Math.floor(Math.random() * 400);
    var fish = $('<div class="pond-prop fish" style="top: ' + top + 'px;"></div>');
    land.append(fish);

    fish.animate({
      left: '450px'
    }, speed, function() {
      fish.remove();
    });
  };

  var self = {
    generateFish: function() {
      loadFish();
    },
    generateBubbles: function() {
      loadBubbles();
    }
  };

  return self;
});
