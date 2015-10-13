'use strict';

var React = require('react-native');

var {
  StatusBarIOS,
} = React;

var StatusBar = {
  setStyle(style) {
    StatusBarIOS.setStyle(style)
  },
};

module.exports = StatusBar;
