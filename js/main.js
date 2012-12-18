'use strict';

requirejs.config({
  baseUrl: 'js/lib',
  enforceDefine: true
});

define(['jquery', 'settings', 'player'],
  function($, settings, Player) {

  var game = $('#game-wrapper');
  var robot = $('#robot-bev');
  var player = new Player(robot);

  setInterval(function() {
    settings.setTimeOfDay();
  }, 500000);
  settings.setSeason();
  settings.setTimeOfDay();

  game.on('click', '#game-area', function(ev) {
    var target = $(ev.target);
    var currLeft = ev.pageX;
    var currTop = ev.pageY;

    if (!robot.hasClass('on')) {
      if (currLeft < 30) {
        currLeft = 30;
      }

      if (currLeft > 290) {
        currLeft = 280;
      }

      if (currTop < 30) {
        currTop = 30;
      }

      if (currTop > 450) {
        currTop = 440;
      }

      if (!target.is('#robot-bev')) {
        player.setPosition({
          currLeft: currLeft,
          currTop: currTop
        });

        player.setDirection();
      }
    }
  });
});
