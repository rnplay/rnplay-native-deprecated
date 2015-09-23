/**
 * React Native Playground
 * https://github.com/jsierles/rnplay
 */

'use strict';

var React = require('react-native');
var Explore = require('./Explore');
var MyAppsContainer = require('./MyAppsContainer');
var CustomApp = require('./CustomApp');
var Settings = require('./Settings');
var About = require('./About');
var QRCodeReader = require('./QRCodeReader');
var Icon = require('react-native-vector-icons/Ionicons');
var NavigationBar = require('../Components/NavigationBar');
var Colors = require('../Utilities/Colors');

var {
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  TabBarIOS,
  View,
} = React;

var Home = React.createClass({
  getInitialState() {
    return {
      selectedTab: 'about',
    };
  },

  render() {
    return (
      <TabBarIOS
        selectedTab={this.state.selectedTab}
        tintColor={Colors.tintColor}
        style={styles.tabBar}
        barTintColor={'white'}>
        <Icon.TabBarItem
          name="explore"
          iconName={'ios-search-strong'}
          title={'Explore'}
          iconSize={32}
          accessibilityLabel="Explore Tab"
          selected={this.state.selectedTab === 'explore'}
          onPress={() => { this.setState({ selectedTab: 'explore', }); }}>
          <Explore />
        </Icon.TabBarItem>
        <Icon.TabBarItem
            name="my-apps"
            iconName={'ios-briefcase-outline'}
            title={'My Apps'}
            iconSize={32}
            accessibilityLabel="My Apps Tab"
            selected={this.state.selectedTab === 'my-apps'}
            onPress={() => { this.setState({selectedTab: 'my-apps',}); }}>
            <MyAppsContainer />
        </Icon.TabBarItem>
        <Icon.TabBarItem
            name="custom-app"
            iconName={'code'}
            title={'Direct URL'}
            iconSize={32}
            accessibilityLabel="Load your custom app"
            selected={this.state.selectedTab === 'custom-app'}
            onPress={() => { this.setState({selectedTab: 'custom-app',}); }}>
          <View style={styles.container}>
            <NavigationBar title={'Direct URL'} />
            <CustomApp />
          </View>
        </Icon.TabBarItem>
        <Icon.TabBarItem
            name="qr_code_reader"
            iconName={'camera'}
            title={'Scan Code'}
            iconSize={32}
            accessibilityLabel="QR Code Reader"
            selected={this.state.selectedTab === 'qr_code_reader'}
            onPress={() => { this.setState({ selectedTab: 'qr_code_reader', }); }}>
          <QRCodeReader />
        </Icon.TabBarItem>
        <Icon.TabBarItem
          name="about"
          iconName={'ios-help-outline'}
          title={'About'}
          iconSize={32}
          accessibilityLabel="About Tab"
          selected={this.state.selectedTab === 'about'}
          onPress={() => { this.setState({ selectedTab: 'about', }); }}>
          <View style={styles.container}>
            <NavigationBar title={'About'} />
            <About />
          </View>
        </Icon.TabBarItem>
      </TabBarIOS>
    )
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

module.exports = Home;
