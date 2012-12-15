'use strict';

requirejs.config({
  baseUrl: 'js/lib',
  enforceDefine: true
});

define(['jquery'],
  function($) {

  var game = $('#game-wrapper');
  var robot = $('#robot-bev');

  game.on('click', '#game-area', function(ev) {
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
    robot.animate({
      left: currLeft + 'px',
      top: currTop + 'px'
    }, 2000);
  });
});
