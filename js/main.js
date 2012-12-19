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
    var location;

    if (!robot.hasClass('on')) {
      location = boundaries[currentLocation].locations;

      if (location) {
        var blockProp = boundaries[location[0]];
        if (blockProp.blocker) {
          if (currLeft >= blockProp.leftMin && currLeft <= blockProp.leftMax &&
            currTop >= blockProp.topMin && currTop <= blockProp.topMax) {
            if (currTop < blockProp.topMax) {
              currTop = blockProp.topMax;
            } else if (currTop > blockProp.topMin) {
              currTop = blockProp.topMin;
            }

            if (currLeft < blockProp.leftMax) {
              currLeft = blockProp.leftMin;
            } else if (currLeft > blockProp.leftMin) {
              currLeft = blockProp.leftMax;
            }
          }
        }
      }

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
