/**
 * React Native Playground
 * https://github.com/jsierles/rnplay
 */

'use strict';

var React = require('react-native');
var Landing = require('./App/Screens/Landing');
var Login = require('./App/Screens/Login');
var Signup = require('./App/Screens/Signup');
var Home = require('./App/Screens/Home');
var _ = require('lodash');

var {
  AppRegistry,
  Navigator,
  StyleSheet,
  Text,
  View,
} = React;


var RNPlayNative = React.createClass({

  componentDidMount() {
    // this.fetchApps();
  },

  renderScene(route, nav) {
    switch (route.id) {
      case 'home':
        return <Home navigator={nav} />;
      case 'landing':
        return <Landing navigator={nav} />;
      case 'login':
        return <Login navigator={nav} />;
      case 'signup':
        return <Signup navigator={nav} />;
      default:
        return (
          <Home navigator={nav} />
        );
      }
  },

  render() {
    var DEFAULT_ROUTE = {id: 'landing' };
    return(
      <Navigator
        initialRoute={DEFAULT_ROUTE}
        renderScene={this.renderScene}
        configureScene={(route) => {
          if (route.sceneConfig) {
            if(route.disableGestures) {
              return _.omit(route.sceneConfig, 'gestures');
            } else {
                return route.sceneConfig;
            }
          }
          return Navigator.SceneConfigs.HorizontalSwipeJump;
        }}
      />
    )
  }
});

AppRegistry.registerComponent('RNPlayNative', () => RNPlayNative);
