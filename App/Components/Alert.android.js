'use strict';

var React = require('react-native');

var {
  ToastAndroid,
} = React;

var Alert = {
  alert(title, message = null, buttons = [{text: 'OK'}], type = null) {
    ToastAndroid.show(title + ': ' + message, ToastAndroid.SHORT);
  },
};

module.exports = Alert;
