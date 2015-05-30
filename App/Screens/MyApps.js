'use strict';

var React = require('react-native');

var {
  ActivityIndicatorIOS,
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Navigator
} = React;

var AppList = require("../Components/AppList");

var MyApps = React.createClass({
  render() {
    return <AppList url="/plays.json" />;
  }
});

module.exports = MyApps;
