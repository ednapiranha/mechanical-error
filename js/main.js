'use strict';

requirejs.config({
  baseUrl: 'js/lib',
  enforceDefine: true
});

define(['jquery', 'settings', 'player', 'boundaries'],
  function($, settings, Player, boundaryItems) {

  var game = $('#game-wrapper');
  var robot = $('#robot-bev');
  var player = new Player(robot);
  var boundaries = boundaryItems;
  localStorage.setItem('mechanicalError-location', 'all');

  setInterval(function() {
    settings.setTimeOfDay();
  }, 500000);
  settings.setSeason();
  settings.setTimeOfDay();

  game.on('click', '#game-area', function(ev) {
    var target = $(ev.target);
    var currLeft = ev.pageX;
    var currTop = ev.pageY;
    var currentLocation = localStorage.getItem('mechanicalError-location');
    var locations;

    player.setPosition({
      currLeft: currLeft,
      currTop: currTop
    });

    if (!robot.hasClass('on')) {
      locations = boundaries[currentLocation].locations;

      if (locations) {
        player.detectBlocker(locations);
        console.log('detecting blockers')
      }

      if (player.currLeft < 30) {
        player.currLeft = 30;
      }

      if (player.currLeft > 290) {
        player.currLeft = 280;
      }

      if (player.currTop < 30) {
        player.currTop = 30;
      }

      if (player.currTop > 450) {
        player.currTop = 440;
      }

      if (!target.is('#robot-bev')) {
        if (target.is('#shopkeep')) {
          console('loading shopkeep')
        } else {
          player.setDirection();
        }
      }
    }
  });
});
