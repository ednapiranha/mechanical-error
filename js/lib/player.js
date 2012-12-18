'use strict';

define(['jquery', 'settings'],
  function($, settings) {

  var MOVE_SPEED = 2500;

  var Player = function(robot) {
    this.robot = robot;
  };

  Player.prototype.setRotation = function(angle) {
    this.robot.css({
      MozTransform: 'rotate(' + angle + 'deg)',
      WebkitTransform: 'rotate(' + angle + 'deg)'
    });
  };

  Player.prototype.resetRotation = function() {
    this.robot.css({
      MozTransform: 'rotate(0deg)',
      WebkitTransform: 'rotate(0deg)'
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
    travelAngle = Math.atan2(travelDiffTop, travelDiffLeft) * (180 / Math.PI) - 90;

    if (this.currLeft < this.robot.position().left) {
      travelAngle = travelAngle * -1;
    }

    if (this.currTop < this.robot.position().top) {
      travelAngle = travelAngle + 90;

      if (this.currLeft > this.robot.position().left) {
        travelAngle = travelAngle - 180;
      }
    }

    this.setRotation(travelAngle);

    speed = ((travelDiffLeft * MOVE_SPEED) + (travelDiffTop * MOVE_SPEED)) / 300;

    this.robot.addClass('on');

    this.robot.animate({
      left: (this.currLeft - 25) + 'px',
      top: (this.currTop - 25) + 'px'
    }, speed, function() {
      self.robot.removeClass();

      settings.setTarget(self.currLeft, self.currTop);
      self.resetRotation();
    });
  };

  return Player;
});
