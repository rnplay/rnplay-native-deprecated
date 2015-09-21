/**
 * React Native Playground
 * https://github.com/rnplay/rnplay-native
 */

'use strict';

var React = require('react-native');

var About = require('../Screens/About');

var {
  AppRegistry,
  View,
} = React;

var RNPlayNative = React.createClass({
  render() {
    return (
      <View style={{flex: 1}}>
        <About />
      </View>
    )
  }
});

module.exports = RNPlayNative;
