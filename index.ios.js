/**
 * React Native Playground
 * https://github.com/jsierles/rnplay
 */

'use strict';

var React = require('react-native');
var Login = require('./App/Screens/Login');
var Signup = require('./App/Screens/Signup');
var Home = require('./App/Screens/Home');
var Guest = require('./App/Screens/Guest');
var ProfileStore = require('./App/Stores/ProfileStore');
var LocalStorage = require('./App/Stores/LocalStorage');
var _ = require('lodash');

var {
  AppRegistry,
  Navigator,
  StyleSheet,
  Text,
  View,
  StatusBarIOS
} = React;

var RNPlayNative = React.createClass({

  getInitialState() {
    return {
      bootstrapped: false
    }
  },

  componentDidMount() {
    StatusBarIOS.setStyle(StatusBarIOS.Style.lightContent);
    LocalStorage.bootstrap(() => this.setState({bootstrapped: true}));

  },

  render() {
    if (this.state.bootstrapped == false) {
      return <View />;
    }
    return <Home />;
  }
});

AppRegistry.registerComponent('RNPlayNative', () => RNPlayNative);
