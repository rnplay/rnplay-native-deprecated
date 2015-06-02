/**
 * React Native Playground
 * https://github.com/jsierles/rnplay
 */

'use strict';

var React = require('react-native');
var qs = require('qs');
var LinkingIOS = require('LinkingIOS');
var AppReloader = require('NativeModules').AppReloader;
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

global.initialLaunch = true;
var RNPlayNative = React.createClass({

  getInitialState() {
    return {
      bootstrapped: false
    };
  },

  componentDidMount() {
    StatusBarIOS.setStyle(StatusBarIOS.Style.lightContent);
    LocalStorage.bootstrap(() => this.setState({bootstrapped: true}));
    LinkingIOS.addEventListener('url', this._processURL);

    if (global.initialLaunch) {
      global.initialLaunch = false;
      var url = LinkingIOS.popInitialURL();
      if (url) {
        this._processURL({url});
      }
    }
  },

  componentWillUnmount() {
    LinkingIOS.removeEventListener('url', this._processURL);
  },

  _processURL(e) {
    var url = e.url.replace('rnplay://', '');
    var {bundle_url, module_name} = qs.parse(url);

    if (bundle_url && module_name) {
      AppReloader.reloadAppWithURLString(bundle_url, module_name);
    }
  },

  render() {
    if (this.state.bootstrapped === false) {
      return <View />;
    }
    return <Home />;
  }
});

AppRegistry.registerComponent('RNPlayNative', () => RNPlayNative);
