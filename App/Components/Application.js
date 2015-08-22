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
var ProfileStore = require('../Stores/ProfileStore');
var LocalStorage = require('../Stores/LocalStorage');

var Art = require('art');
var _ = require('lodash');

var {
  AppRegistry,
  Navigator,
  StyleSheet,
  Text,
  View,
  StatusBarIOS
} = React;

// globals are bad, we make an exception here for now
var RN_VERSION = require('../../package.json').dependencies['react-native'];
global.RN_VERSION_DISPLAY = RN_VERSION;
var githubPrefix = 'rnplay/react-native#';
RN_VERSION = RN_VERSION.replace(githubPrefix, '').replace(/\./g,'').replace(/-/g, '')

global.RN_VERSION = RN_VERSION;

var RNPlayNative = React.createClass({

  getInitialState() {
    return {
      bootstrapped: false
    };
  },

  componentDidMount() {
    StatusBarIOS.setStyle('light-content');
    LocalStorage.bootstrap(() => this.setState({bootstrapped: true}));
    LinkingIOS.addEventListener('url', this._processURL);

    var url = LinkingIOS.popInitialURL();
    if (url) {
      this._processURL({url});
    }
  },

  componentWillUnmount() {
    LinkingIOS.removeEventListener('url', this._processURL);
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
    if (this.state.bootstrapped === false) {
      return <View />;
    }
    return <Home />;
  }
});

module.exports = RNPlayNative;
