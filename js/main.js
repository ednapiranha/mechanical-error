'use strict';

requirejs.config({
  baseUrl: 'js/lib',
  enforceDefine: true
});

define(['jquery', 'settings'],
  function($, settings) {

  var game = $('#game-wrapper');
  var robot = $('#robot-bev');

  var MOVE_SPEED = 2000;

  settings.setWeather();
  settings.setTimeOfDay();

  game.on('click', '#game-area', function(ev) {
    var target = $(ev.target);
    var currLeft = ev.pageX;
    var currTop = ev.pageY;

    if (currLeft < 0) {
      currLeft = 0;
    }

    if (currLeft > 290) {
      currLeft = 290;
    }

    if (currTop < 0) {
      currTop = 0;
    }

    if (currTop > 450) {
      currTop = 450;
    }

    if (!target.is('#robot-bev')) {
      var speed = MOVE_SPEED;

      var travelDiffLeft = Math.abs(currLeft - robot.position().left);
      var travelDiffTop = Math.abs(currTop - robot.position().top);

      if (travelDiffLeft < 40 || travelDiffTop < 40) {
        speed = MOVE_SPEED / 2;
      }

      robot.animate({
        left: currLeft + 'px',
        top: currTop + 'px'
      }, speed, function() {
        settings.setTarget(currLeft, currTop);
      });
    }
  });
});
