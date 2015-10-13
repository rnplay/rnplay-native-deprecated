'use strict';

var React = require('react-native');

var {
  AlertIOS,
} = React;

var Alert = {
  alert(title, message = null, buttons = [{text: 'OK'}], type = null) {
    AlertIOS.alert(title, message, buttons, type);
  }
};

module.exports = Alert;
