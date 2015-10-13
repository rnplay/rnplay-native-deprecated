/**
 * React Native Playground
 * https://github.com/rnplay/rnplay-native
 */

'use strict';

var React = require('react-native');

var Home = require('../Screens/Home');

var {
  AppRegistry,
  View,
} = React;

var RNPlayNative = React.createClass({
  render() {
    return (
      <View style={{flex: 1}}>
        <Home />
      </View>
    )
  }
});

module.exports = RNPlayNative;
