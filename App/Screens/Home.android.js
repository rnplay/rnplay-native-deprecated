/**
 * React Native Playground
 * https://github.com/jsierles/rnplay
 */

'use strict';

var React = require('react-native');
// var Explore = require('./Explore');
// var MyAppsContainer = require('./MyAppsContainer');
// var CustomApp = require('./CustomApp');
// var Settings = require('./Settings');
var About = require('./About');
// var QRCodeReader = require('./QRCodeReader');
// var Icon = require('react-native-vector-icons/Ionicons');
var DrawerLayout = require('react-native-drawer-layout');
var NavigationBar = require('../Components/NavigationBar');

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} = React;

var Home = React.createClass({
  getInitialState() {
    return {
      selectedScreen: this._getAboutScreen(),
    };
  },

  _getExploreScreen() {
    return {
      title: 'Explore',
      // This needs to return the real explore screen...
      component: this._renderAbout(),
    };
  },

  _getAboutScreen() {
    return {
      title: 'About',
      component: this._renderAbout(),
    };
  },

  _renderAbout() {
    return React.createClass({
      render() {
        return (
          <About />
        );
      }
    });
  },

  _renderSelectedScreen: function() {
    var Component = this.state.selectedScreen.component;
    return (
      <View style={styles.container}>
        <NavigationBar
          title={this.state.selectedScreen.title}
          handleNavIconTap={() => this.drawer.openDrawer()} />
        <Component />
      </View>
    );
  },

  _handleScreenSelected(selectedScreen) {
    this.drawer.closeDrawer();
    this.setState({ selectedScreen });
  },

  render() {
    var navigationView = (
      <View style={[styles.menuContainer, {backgroundColor: '#fff'}]}>
        <TouchableOpacity onPress={() => this._handleScreenSelected(this._getExploreScreen())}>
          <Text>Explore</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this._handleScreenSelected(this._getAboutScreen())}>
          <Text>About</Text>
        </TouchableOpacity>
      </View>
    );

    return (
      <DrawerLayout
        ref={(drawer) => { this.drawer = drawer; }}
        onDrawerSlide={(e) => this.setState({drawerSlideOutput: JSON.stringify(e.nativeEvent)})}
        onDrawerStateChanged={(e) => this.setState({drawerStateChangedOutput: JSON.stringify(e)})}
        drawerWidth={300}
        renderNavigationView={() => navigationView}>
        {this._renderSelectedScreen()}
      </DrawerLayout>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

module.exports = Home;
