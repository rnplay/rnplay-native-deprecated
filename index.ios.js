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

var DEFAULT_ROUTE = {id: 'home'};

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

  renderScene(route, nav) {
    switch (route.id) {
      case 'home':
        return <Home navigator={nav} />;
      case 'guest':
        return <Guest navigator={nav} />;
      case 'login':
        return <Login navigator={nav} error={route.error}/>;
      case 'signup':
        return <Signup navigator={nav} />;
      default:
        return (
          <Home navigator={nav} />
        );
      }
  },

  render() {
    if (this.state.bootstrapped == false) {
      return <View />;
    }

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
