/**
 * React Native Playground
 * https://github.com/jsierles/rnplay
 */

'use strict';

var React = require('react-native');

var qs = require('qs');
var LinkingIOS = require('LinkingIOS');
var reloadApp = require('../Utilities/reloadApp');
var Login = require('../Screens/Login');
var Signup = require('../Screens/Signup');
var Home = require('../Screens/Home');
var Guest = require('../Screens/Guest');
var VersionManager = require('react-native-versions');

var _ = require('lodash');

var {
  AppRegistry,
  Navigator,
  StyleSheet,
  Text,
  View,
  StatusBarIOS,
  NativeAppEventEmitter,
  Platform
} = React;

// globals are bad, we make an exception here for now
global.PACKAGE = require('../../package.json');
var RN_VERSION = global.PACKAGE.dependencies['react-native'];
global.RN_VERSION_DISPLAY = RN_VERSION;
var githubPrefix = 'rnplay/react-native#';
RN_VERSION = RN_VERSION.replace(githubPrefix, '').replace(/\./g,'').replace(/-/g, '')

global.RN_VERSION = RN_VERSION;

global.PLATFORM = Platform.OS;

var RNPlayNative = React.createClass({

  getInitialState() {
    return {
      bootstrapped: false
    };
  },

  componentDidMount() {
    LinkingIOS.addEventListener('url', this._processURL);

    var url = LinkingIOS.popInitialURL();
    if (url) {
      this._processURL({url});
    }

    this.returnSubscription = NativeAppEventEmitter.addListener('returnToHome',
      (data) => {
        if (this._onReturn) {
          this._onReturn();
        }
      });
  },

  componentWillUnmount() {
    LinkingIOS.removeEventListener('url', this._processURL);
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
        <VersionManager
          appId="9e9aad73a03e4848f22b"
          apiId="16c9d784280d14f2"
          apiSecret="-LWACQqiO8az6c68rTEIjTA76i_nzPHDWJkxko3rogM"
          active={true}
          moduleName="RNPlayNative" />
      </View>
    )
  }
});

module.exports = RNPlayNative;
