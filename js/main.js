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

  var detectBlocker = function(locations, currLeft, currTop) {
    var centerPointLeft;
    var centerPointTop;

    var centerMatched = function() {
      if (currTop > robot.position().top) {
        centerPointTop = Math.abs(Math.abs((Math.abs(currTop - robot.position().top) / 2) + robot.position().top));
      } else {
        centerPointTop = Math.abs((Math.abs(currTop - robot.position().top) / 2) - robot.position().top);
      }

      if (currLeft > robot.position().left) {
        centerPointLeft = Math.abs((Math.abs(currLeft - robot.position().left) / 2) + robot.position().left);
      } else {
        centerPointLeft = Math.abs((Math.abs(currLeft - robot.position().left) / 2) - robot.position().left);
      }

      return centerPointTop > blockProp.topMin &&
        centerPointTop < blockProp.topMax &&
        centerPointLeft > blockProp.leftMin &&
        centerPointLeft < blockProp.leftMax;
    };

    for (var i = 0; i < locations.length; i ++) {
      var blockProp = boundaries[locations[i]];

      if (blockProp.blocker && centerMatched()) {
        console.log('matched')

        if (currTop >= blockProp.topMax) {
          currTop = blockProp.topMax;
        } else if (currTop <= blockProp.topMin) {
          currTop = blockProp.topMin;
        }

        if (currLeft <= blockProp.leftMax) {
          currLeft = blockProp.leftMin;
        } else if (currLeft >= blockProp.leftMin) {
          currLeft = blockProp.leftMax;
        }

        break;
      }
    }

    return {
      currLeft: currLeft,
      currTop: currTop
    };
  };

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

    if (!robot.hasClass('on')) {
      locations = boundaries[currentLocation].locations;

      if (locations) {
        var currPositions = detectBlocker(locations, currLeft, currTop);
        currLeft = currPositions.currLeft;
        currTop = currPositions.currTop;
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
