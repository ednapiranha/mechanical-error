'use strict';

requirejs.config({
  baseUrl: 'js/lib',
  enforceDefine: true
});

define(['jquery', 'settings'],
  function($, settings) {

  var game = $('#game-wrapper');
  var robot = $('#robot-bev');

  var MOVE_SPEED = 3000;

  setTimeout(function() {
    settings.setTimeOfDay();
  }, 500000);
  settings.setSeason();
  settings.setTimeOfDay();

  game.on('click', '#game-area', function(ev) {
    var target = $(ev.target);
    var currLeft = ev.pageX;
    var currTop = ev.pageY;

    if (!robot.hasClass('on')) {
      if (currLeft < 0) {
        currLeft = 0;
      }

      if (currLeft > 290) {
        currLeft = 280;
      }

      if (currTop < 0) {
        currTop = 0;
      }

      if (currTop > 450) {
        currTop = 440;
      }

      if (!target.is('#robot-bev')) {
        var speed = MOVE_SPEED;

        var travelDiffLeft = Math.abs(currLeft - robot.position().left);
        var travelDiffTop = Math.abs(currTop - robot.position().top);

        if (travelDiffLeft < 100 && travelDiffTop < 100) {
          speed = MOVE_SPEED / 3;
        }

        robot.addClass('on');

        if (currTop < robot.position().top) {
          robot.addClass('up');
        } else {
          robot.addClass('down');
        }

        if (travelDiffLeft > 30 && travelDiffTop > 30) {
          if (currLeft < robot.position().left && currTop < robot.position().top) {
            robot.addClass('up-left');
          } else if (currLeft > robot.position().left && currTop > robot.position().top) {
            robot.addClass('down-right');
          } else if (currLeft > robot.position().left && currTop < robot.position().top) {
            robot.addClass('up-right');
          } else {
            robot.addClass('down-left');
          }
        }

        if (travelDiffLeft < 30 || travelDiffTop < 30) {
          if (currLeft < robot.position().left) {
            robot.addClass('left');
          } else {
            robot.addClass('right');
          }
        }

        robot.animate({
          left: (currLeft - 25) + 'px',
          top: (currTop - 25) + 'px'
        }, speed, function() {
          robot.removeClass();
          settings.setTarget(currLeft, currTop);
        });
      }
    }
  });
});
