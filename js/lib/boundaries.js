'use strict';

define(function() {
  var BOUNDARIES = {
    // Default exit location
    all: {
      leftMin: 140,
      leftMax: 168,
      topMin: 438,
      topMax: 460,
      className: 'all',
      preLocation: ['tree1', 'tree2', 'tree3', 'pond', 'house', 'cave', 'store']
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
      className: 'tree1',
      preLocation: ['all']
    },
    tree2: {
      leftMin: 155,
      leftMax: 202,
      topMin: 203,
      topMax: 244,
      className: 'tree2',
      preLocation: ['all'],
      locations: ['cave']
    },
    tree3: {
      leftMin: 143,
      leftMax: 173,
      topMin: 286,
      topMax: 321,
      className: 'tree3',
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
      leftMin: 210,
      leftMax: 240,
      topMin: 310,
      topMax: 340,
      className: 'cave',
      origin: 'tree2',
      preLocation: ['tree2']
    },
    store: {
      leftMin: 220,
      leftMax: 285,
      topMin: 40,
      topMax: 115,
      className: 'store',
      preLocation: ['all']
    }
  };

  return BOUNDARIES;
});
