/**
 * React Native Playground
 * https://github.com/jsierles/rnplay
 */

'use strict';

var React = require('react-native');

var qs = require('qs');
var Linking = require('Linking');
var reloadApp = require('../Utilities/reloadApp');
var Login = require('../Screens/Login');
var Signup = require('../Screens/Signup');
var Home = require('../Screens/Home');
var Guest = require('../Screens/Guest');

var _ = require('lodash');

var {
  AppRegistry,
  Navigator,
  StyleSheet,
  Text,
  View,
  StatusBarIOS,
  NativeAppEventEmitter,
} = React;

var RNPlayNative = React.createClass({

  getInitialState() {
    return {
      bootstrapped: false
    };
  },

  componentDidMount() {
    Linking.addEventListener('url', this._processURL);

    var url = Linking.getInitialURL()
      .then((url) => {
        if (url) {
          this._processURL({url});
        }
      });

    this.returnSubscription = NativeAppEventEmitter.addListener('returnToHome',
      (data) => {
        if (this._onReturn) {
          this._onReturn();
        }
      });
  },

  componentWillUnmount() {
    Linking.removeEventListener('url', this._processURL);
    this.returnSubscription.remove();
  },

  _onReturn() {
    StatusBarIOS.setHidden(false);
  },

  _processURL(e) {
    var url = e.url.replace('rnplay://', '');
    var [path, querystring] = url.split("?");

    if (querystring) {
      var {bundle_url, module_name, params_json} = qs.parse(querystring);
      if (bundle_url && module_name) {
        reloadApp(bundle_url, module_name, params_json);
      }

    }
  },

  render() {
    return (
      <View style={{flex: 1}}>
        <Home />
      </View>
    )
  }
});

module.exports = RNPlayNative;
