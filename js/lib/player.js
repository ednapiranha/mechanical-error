'use strict';

define(['jquery', 'settings', 'boundaries'],
  function($, settings, boundaryItems) {

  var boundaries = boundaryItems;

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
    var speed;

    var travelDiffLeft = Math.abs(this.currLeft - this.robot.position().left);
    var travelDiffTop = Math.abs(this.currTop - this.robot.position().top);
    this.travelAngle = Math.atan2(travelDiffTop, travelDiffLeft) * (180 / Math.PI) - 90;

    // going up
    if (this.currTop < this.robot.position().top) {
      if (this.currLeft > this.robot.position().left) {
        // right
        this.travelAngle = this.travelAngle * -1 + 180;
      } else {
        // left
        this.travelAngle = this.travelAngle - 180;
      }

    // going down
    } else {
      if (this.currLeft < this.robot.position().left) {
        this.travelAngle = this.travelAngle * -1;
      }
    }

    this.setRotation(this.travelAngle);

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
