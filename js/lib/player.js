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

  var pointMatched = function(self, blockProp) {
    var leftPoints = [];
    var topPoints = [];
    var pointFoundTop = false;
    var pointFoundLeft = false;

    var diffTop = Math.abs(self.currTop - self.robot.position().top) / 10;
    var diffLeft = Math.abs(self.currLeft - self.robot.position().left) / 10;

    if (self.currTop > self.robot.position().top) {
      for (var y = 1; y < 11; y ++) {
        topPoints.push(self.robot.position().top + diffTop * y);
      }
    } else {
      for (var y = 1; y < 11; y ++) {
        topPoints.push(self.robot.position().top - diffTop * y);
      }
    }

    if (self.currLeft > self.robot.position().left) {
      for (var x = 1; x < 11; x ++) {
        leftPoints.push(self.robot.position().left + diffLeft * x);
      }
    } else {
      for (var x = 1; x < 11; x ++) {
        leftPoints.push(self.robot.position().left - diffLeft * x);
      }
    }

    for (var i = 0; i < topPoints.length; i ++) {
      if (topPoints[i] >= blockProp.topMin && topPoints[i] <= blockProp.topMax) {
        pointFoundTop = true;
        break;
      }
    }

    for (var i = 0; i < leftPoints.length; i ++) {
      if (leftPoints[i] >= blockProp.leftMin && leftPoints[i] <= blockProp.leftMax) {
        pointFoundLeft = true;
        break;
      }
    }

    return pointFoundTop && pointFoundLeft;
  };

  Player.prototype.detectBlocker = function(locations) {
    for (var i = 0; i < locations.length; i ++) {
      var blockProp = boundaries[locations[i]];

      if (blockProp.blocker && (pointMatched(this, blockProp) ||
        this.currTop >= blockProp.topMin && this.currTop <= blockProp.topMax &&
        this.currLeft >= blockProp.leftMin && this.currLeft <= blockProp.leftMax)) {

        if (this.currLeft < blockProp.leftMax) {
          this.currLeft = blockProp.leftMin;
        } else {
          this.currLeft = blockProp.leftMax;
        }

        this.currTop = this.robot.position().top;

        break;
      }
    }
  };

  return Player;
});
