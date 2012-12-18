'use strict';

define(['jquery'],
  function($s) {

  var land = $('#game-area');

  var loadFish = function() {
    var speed = Math.floor(Math.random() * 3000);
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
    generateFish: function(pond) {
      loadFish();
      setInterval(function() {
        loadFish();
      }, 500);
    }
  };

  return self;
});
