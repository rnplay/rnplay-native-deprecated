/**
 * React Native Playground
 * https://github.com/jsierles/rnplay
 */

'use strict';

var React = require('react-native');
var Explore = require('./Explore');
var MyAppsContainer = require('./MyAppsContainer');
// var CustomApp = require('./CustomApp');
// var Settings = require('./Settings');
var About = require('./About');
// var QRCodeReader = require('./QRCodeReader');
// var Icon = require('react-native-vector-icons/Ionicons');
var DrawerLayout = require('react-native-drawer-layout');
var NavigationBar = require('../Components/NavigationBar');
var Colors = require('../Utilities/Colors');

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
    // To better debug the drawer...
    // this.drawer.openDrawer();
  },

  _getExploreScreen() {
    return {
      title: 'Explore',
      component: this._renderExplore(),
    };
  },

  _getMyAppsScreen() {
    return {
      title: 'My Apps',
      component: this._renderMyApps(),
    };
  },

  _getAboutScreen() {
    return {
      title: 'About',
      component: this._renderAbout(),
    };
  },

  _renderExplore() {
    return React.createClass({
      render() {
        return (
          <Explore />
        );
      }
    });
  },

  _renderMyApps() {
    return React.createClass({
      render() {
        return (
          <MyAppsContainer />
        );
      }
    });
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
      <View style={[styles.container, {backgroundColor: 'white'}]}>
        <View style={{flex: 1, justifyContent: 'flex-end', backgroundColor: Colors.tintColor}}>
          <Text style={{color: 'white', margin: 20, fontSize: 18}}>React Native Playground</Text>
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
              title: 'My Apps',
              component: this._getMyAppsScreen(),
            },
            {
              id: 3,
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
