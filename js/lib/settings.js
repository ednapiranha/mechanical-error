'use strict';

define(['jquery'],
  function($) {

  var land = $('#game-area');
  var timeOfDay = $('#time-of-day');
  var scene = $('#scene-change');
  var robot = $('#robot-bev');
  var currentLocation = 'all';

  var loadLocation = function(location) {
    localStorage.setItem('mechanicalError-location', location);
    scene.addClass('on');
    land.find('.house-prop, .tree-prop').remove();

    setTimeout(function() {
      if (location === 'tree1' || location === 'tree2' || location === 'tree3') {
        currentLocation = 'tree';
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
      } else {
        currentLocation = 'all';
        land.removeClass();
        self.setWeather();
      }
      robot.css({ left: '0', top: '0' });
      scene.removeClass();
    }, 2000);
  };

  var self = {
    setWeather: function() {
      var currSeason = (new Date()).getMonth();

      land.removeClass();

      if (currSeason > 2 && currSeason < 7) {
        land.addClass('spring');
      } else if (currSeason > 6 && currSeason < 9) {
        land.addClass('summer');
      } else if (currSeason > 8 && currSeason < 11) {
        land.addClass('autumn');
      } else {
        land.addClass('winter');
      }
    },

    setTimeOfDay: function() {
      var currTime = (new Date()).getHours();

      timeOfDay.removeClass();

      if (currTime > 16 && currTime < 21) {
        timeOfDay.addClass('evening');
      } else if ((currTime > 20 && currTime < 24) || (currTime > -1 && currTime < 6)) {
        timeOfDay.addClass('night');
      }
    },

    setTarget: function(left, top) {
      // House
      console.log(left, top)
      if (left > 225 && top > 390) {
        if (currentLocation === 'tree' || currentLocation === 'house') {
          loadLocation('all');
        } else {
          loadLocation('house');
        }
      } else if (left > 68 && left < 97 && top > 210 && top < 250) {
        loadLocation('tree1');
      } else if (left > 159 && left < 185 && top > 197 && top < 230) {
        loadLocation('tree2');
      } else if (left > 139 && left < 165 && top > 278 && top < 312) {
        loadLocation('tree3');
      }
    }
  };

  return self;
});
