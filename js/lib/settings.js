'use strict';

define(['jquery', 'trees', 'pond'],
  function($, trees, pond) {

  var land = $('#game-area');
  var timeOfDay = $('#time-of-day');
  var scene = $('#scene-change');
  var robot = $('#robot-bev');
  var currentLocation = 'all';

  var boundaries = {
    all: {
      leftMin: 133,
      leftMax: 194,
      topMin: 437,
      topMax: 460,
      preLocation: ['tree', 'pond', 'house']
    },
    house: {
      leftMin: 225,
      leftMax: 280,
      topMin: 390,
      topMax: 440,
      preLocation: ['all']
    },
    tree1: {
      leftMin: 58,
      leftMax: 111,
      topMin: 208,
      topMax: 269,
      preLocation: ['all']
    },
    tree2: {
      leftMin: 155,
      leftMax: 202,
      topMin: 203,
      topMax: 244,
      preLocation: ['all']
    },
    tree3: {
      leftMin: 143,
      leftMax: 173,
      topMin: 286,
      topMax: 321,
      preLocation: ['all']
    },
    pond: {
      leftMin: 15,
      leftMax: 85,
      topMin: 382,
      topMax: 446,
      preLocation: ['all']
    }
  };

  var loadLocation = function(location) {
    localStorage.setItem('mechanicalError-location', location);
    scene.addClass('on');
    land.find('.pond-prop, .house-prop, .tree-prop').remove();

    setTimeout(function() {
      if (location === 'tree1' || location === 'tree2' || location === 'tree3') {
        currentLocation = 'tree';
        trees.generateFruit();
        land
          .removeClass()
          .addClass('tree');
      } else if (location === 'house') {
        currentLocation = 'house';
        land
          .removeClass()
          .addClass('house');

        var bed = localStorage.getItem('mechanicalError-bed') || 'bed1';
        var bedEl = $('<div class="house-prop bed ' + bed + '"></div>');

        land.append(bedEl);
      } else if (location === 'pond') {
        currentLocation = 'pond';
        pond.generateFish();
        pond.generateBubbles();
        land
          .removeClass()
          .addClass('pond');
      } else {
        currentLocation = 'all';
        land.removeClass();
        self.setSeason();
      }
      robot.css({ left: '0', top: '0' });
      scene.removeClass();
    }, 1000);
  };

  var self = {
    setSeason: function() {
      var currSeason = (new Date()).getMonth();

      land.removeClass();

      if (currSeason >= 2 && currSeason < 7) {
        land.addClass('spring');
      } else if (currSeason >= 6 && currSeason < 9) {
        land.addClass('summer');
      } else if (currSeason >= 9 && currSeason < 11) {
        land.addClass('autumn');
      } else {
        land.addClass('winter');
      }
    },

    setTimeOfDay: function() {
      var currTime = (new Date()).getHours();

      timeOfDay.removeClass();

      if (currTime >= 16 && currTime < 20) {
        timeOfDay.addClass('evening');
      } else if ((currTime > 19 && currTime < 24) || (currTime > -1 && currTime < 6)) {
        timeOfDay.addClass('night');
      }
    },

    setTarget: function(left, top) {
      // House
      // console.log(left, top)

      for (var key in boundaries) {
        var boundary = boundaries[key];
        if (left > boundary.leftMin && left < boundary.leftMax &&
          top > boundary.topMin && top < boundary.topMax) {
          if (boundary.preLocation.indexOf(currentLocation) > -1) {
            loadLocation(key);
          }
        }
      }
    }
  };

  return self;
});
