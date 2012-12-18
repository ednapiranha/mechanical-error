'use strict';

define(['jquery', 'settings'],
  function($, settings) {

  var MOVE_SPEED = 3000;
  var REVERSE_FRAC = 3.15;

  var Player = function(robot) {
    this.robot = robot;
  };

  Player.prototype.setRotation = function(angle) {
    this.robot.css({
      MozTransform: 'rotate(' + angle + 'deg)',
      WebkitTransform: 'rotate(' + angle + 'deg)'
    });
  };

  Player.prototype.setPosition = function(options) {
    this.currTop = options.currTop;
    this.currLeft = options.currLeft;
  };

  Player.prototype.setDirection = function() {
    var self = this;
    var travelAngle;
    var speed;

    var travelDiffLeft = Math.abs(this.currLeft - this.robot.position().left);
    var travelDiffTop = Math.abs(this.currTop - this.robot.position().top);

    if (this.currTop > this.robot.position().top) {
      travelAngle = Math.atan2(travelDiffTop, travelDiffLeft) * (180 / Math.PI);
      if (travelAngle < 35) {
        if (this.currLeft > this.robot.position().left) {
          this.setRotation(-90);
        } else {
          this.setRotation(90);
        }
      } else if (travelAngle < 75 || travelAngle > 104) {
        if (this.currLeft > this.robot.position().left) {
          this.setRotation(travelAngle * -1);
        } else {
          this.setRotation(travelAngle);
        }
      }
    } else {
      travelAngle = Math.atan2(travelDiffLeft, travelDiffTop) * (180 / Math.PI);
      if (travelAngle < 35) {
        this.setRotation(-180);
      } else {
        if (this.currLeft > this.robot.position().left) {
          this.setRotation(travelAngle * REVERSE_FRAC * -1);
        } else {
          this.setRotation(travelAngle * REVERSE_FRAC);
        }
      }
    }

    speed = ((travelDiffLeft * MOVE_SPEED) + (travelDiffTop * MOVE_SPEED)) / 300;

    this.robot.addClass('on');

    this.robot.animate({
      left: (this.currLeft - 25) + 'px',
      top: (this.currTop - 25) + 'px'
    }, speed, function() {
      self.robot.removeClass();

      settings.setTarget(self.currLeft, self.currTop);
      self.robot.css({
        MozTransform: 'rotate(0deg)',
        WebkitTransform: 'rotate(0deg)'
      });
    });
  };

  return Player;
});
