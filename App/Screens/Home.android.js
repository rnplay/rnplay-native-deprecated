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
  ListView,
  Image,
} = React;

var dataSource = new ListView.DataSource({
  rowHasChanged: (row1, row2) => row1 !== row2,
});

var Home = React.createClass({
  getInitialState() {
    return {
      selectedScreen: this._getAboutScreen(),
    };
  },

  componentDidMount() {
    this.drawer.openDrawer();
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

  _renderMenuRow(menuItem) {
    return (
      <View style={{height: 50}}>
        <TouchableOpacity onPress={() => this._handleScreenSelected(menuItem.component)}>
          <Text style={{marginLeft: 50}}>{menuItem.title}</Text>
        </TouchableOpacity>
      </View>
    );
  },

  render() {
    var navigationView = (
      <View style={[styles.container, {backgroundColor: '#fff'}]}>
        <View style={{flex: 1, justifyContent: 'flex-end', backgroundColor: '#712FA9'}}>
          <Text style={{color: '#fff', margin: 20, fontSize: 18}}>React Native Playground</Text>
        </View>
        <ListView
          dataSource={dataSource.cloneWithRows([
            {
              id: 1,
              title: 'Explore',
              component: this._getExploreScreen(),
            },
            {
              id: 2,
              title: 'About',
              component: this._getAboutScreen(),
            },
          ])}
          renderRow={this._renderMenuRow}
          style={{flex: 3, paddingTop: 50}}
        />
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
});

module.exports = Home;
