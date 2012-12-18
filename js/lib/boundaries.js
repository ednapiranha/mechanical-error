'use strict';

define(function() {
  var LOCATIONS = {
    // Default exit location
    all: {
      leftMin: 140,
      leftMax: 168,
      topMin: 438,
      topMax: 460,
      className: 'all',
      preLocation: ['tree', 'pond', 'house', 'cave']
    },
    house: {
      leftMin: 225,
      leftMax: 280,
      topMin: 390,
      topMax: 440,
      className: 'house',
      preLocation: ['all']
    },
    tree1: {
      leftMin: 58,
      leftMax: 111,
      topMin: 208,
      topMax: 269,
      className: 'tree',
      preLocation: ['all']
    },
    tree2: {
      leftMin: 155,
      leftMax: 202,
      topMin: 203,
      topMax: 244,
      className: 'tree',
      preLocation: ['all'],
      locations: ['cave']
    },
    tree3: {
      leftMin: 143,
      leftMax: 173,
      topMin: 286,
      topMax: 321,
      className: 'tree',
      preLocation: ['all']
    },
    pond: {
      leftMin: 15,
      leftMax: 85,
      topMin: 382,
      topMax: 446,
      className: 'pond',
      preLocation: ['all']
    },
    cave: {
      leftMin: 215,
      leftMax: 235,
      topMin: 315,
      topMax: 335,
      className: 'cave',
      preLocation: ['cave', 'tree']
    }
  };

  return LOCATIONS;
});
