'use strict';

define(['jquery', 'trees', 'pond', 'boundaries', 'cave'],
  function($, trees, pond, boundaryItems, cave) {

  var land = $('#game-area');
  var timeOfDay = $('#time-of-day');
  var scene = $('#scene-change');
  var robot = $('#robot-bev');
  var house = $('.house');
  var currentLocation = 'all';
  var boundaries = boundaryItems;

  var timerFish;
  var timerBubbles;
  var timerFruit;
  var timerGem;

  var unload = function() {
    land.find('.pond-prop, .house-prop, .tree-prop, .cave-prop, .store-prop').remove();
    clearInterval(timerFish);
    clearInterval(timerBubbles);
    clearInterval(timerFruit);
    clearInterval(timerGem);
  };

  var loadSecondaryLocations = function(location) {
    var loc = boundaries[location];
    if (loc.locations) {
      for (var i = 0; i < loc.locations.length; i ++) {
        if (loc.className) {
          land.append('<div class="' + loc.className +
            '-prop ' + loc.locations[i] + '"></div>');
        }
      }
    }
  };

  var loadDetailContent = function(location) {
    switch (location) {
      case 'tree':
        timerFruit = setInterval(function() {
          trees.generateFruit();
        }, 1500);
        break;

      case 'house':
        var bed = localStorage.getItem('mechanicalError-bed') || 'bed1';
        var bedEl = $('<div class="house-prop bed ' + bed + '"></div>');

        land.append(bedEl);
        break;

      case 'pond':
        timerFish = setInterval(function() {
          pond.generateFish();
        }, 600);
        timerBubbles = setInterval(function() {
          pond.generateBubbles();
        }, 900);
        break;

      case 'cave':
        timerGem = setInterval(function() {
          cave.generateGems();
        }, 1300);
        break;

      case 'store':
        var shopkeepEl = $('<div class="store-prop shopkeep"></div>');
        var shopDisplayEl = $('<div class="store-prop table-display"></div>');
        land.append(shopkeepEl).append(shopDisplayEl);
        break;
    }
  };

  var loadLocation = function(location) {
    localStorage.setItem('mechanicalError-location', location);
    scene.addClass('on');

    currentLocation =  boundaries[location].className;

    setTimeout(function() {
      unload();
      land
        .removeClass()
        .addClass(boundaries[location].className);

      loadDetailContent(boundaries[location].className);
      loadSecondaryLocations(location);

      if (location === 'all') {
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

      if (currSeason >= 1 && currSeason < 6) {
        land.addClass('spring');
      } else if (currSeason >= 5 && currSeason < 8) {
        land.addClass('summer');
      } else if (currSeason >= 8 && currSeason < 11) {
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
        house.addClass('night');
      } else if ((currTime > 19 && currTime < 24) || (currTime > -1 && currTime < 6)) {
        timeOfDay.addClass('night');
        house.addClass('night');
      } else {
        house.removeClass('night');
      }
    },

    setTarget: function(left, top) {
      console.log(left, top)

      for (var key in boundaries) {
        var boundary = boundaries[key];
        if (left > boundary.leftMin && left < boundary.leftMax &&
          top > boundary.topMin && top < boundary.topMax) {

          if (boundary.preLocation.indexOf(currentLocation) > -1 && !boundary.blocker) {
            loadLocation(key);
          }
        }
      }
    }
  };

  return self;
});
