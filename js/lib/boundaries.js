'use strict';

define(function() {
  var LOCATIONS = {
    // Default exit location
    all: {
      leftMin: 140,
      leftMax: 168,
      topMin: 438,
      topMax: 460,
      blocker: false,
      className: 'all',
      preLocation: ['tree', 'pond', 'house', 'cave', 'store']
    },
    house: {
      leftMin: 225,
      leftMax: 280,
      topMin: 390,
      topMax: 440,
      blocker: false,
      className: 'house',
      preLocation: ['all']
    },
    tree1: {
      leftMin: 58,
      leftMax: 111,
      topMin: 208,
      topMax: 269,
      blocker: false,
      className: 'tree',
      preLocation: ['all']
    },
    tree2: {
      leftMin: 155,
      leftMax: 202,
      topMin: 203,
      topMax: 244,
      blocker: false,
      className: 'tree',
      preLocation: ['all'],
      locations: ['cave']
    },
    tree3: {
      leftMin: 143,
      leftMax: 173,
      topMin: 286,
      topMax: 321,
      blocker: false,
      className: 'tree',
      preLocation: ['all']
    },
    pond: {
      leftMin: 15,
      leftMax: 85,
      topMin: 382,
      topMax: 446,
      blocker: false,
      className: 'pond',
      preLocation: ['all']
    },
    cave: {
      leftMin: 210,
      leftMax: 240,
      topMin: 310,
      topMax: 340,
      blocker: false,
      className: 'cave',
      preLocation: ['cave', 'tree']
    },
    store: {
      leftMin: 220,
      leftMax: 285,
      topMin: 40,
      topMax: 115,
      blocker: false,
      className: 'store',
      preLocation: ['all'],
      locations: ['storeTable']
    },
    storeTable: {
      leftMin: 207,
      leftMax: 380,
      topMin: 30,
      topMax: 190,
      blocker: true,
      className: 'goods',
      preLocation: ['store']
    }
  };

  return LOCATIONS;
});
