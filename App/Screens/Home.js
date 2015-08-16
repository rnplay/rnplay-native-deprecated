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

var {TabBarIOS} = require('react-native-icons');
var TabBarItemIOS = TabBarIOS.Item;

var {
  AppRegistry,
  StyleSheet,
  TouchableOpacity
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
        tintColor={'#712FA9'}
        style={styles.tabBar}
        barTintColor={'white'}>
        <TabBarItemIOS
          name="explore"
          iconName={'ion|ios-search-strong'}
          title={'Explore'}
          iconSize={32}
          accessibilityLabel="Explore Tab"
          selected={this.state.selectedTab === 'explore'}
          onPress={() => { this.setState({ selectedTab: 'explore', }); }}>
          <Explore />
        </TabBarItemIOS>
        <TabBarItemIOS
            name="my-apps"
            iconName={'ion|ios-briefcase-outline'}
            title={'My Apps'}
            iconSize={32}
            accessibilityLabel="My Apps Tab"
            selected={this.state.selectedTab === 'my-apps'}
            onPress={() => { this.setState({selectedTab: 'my-apps',}); }}>
          <MyAppsContainer />
        </TabBarItemIOS>
        <TabBarItemIOS
            name="custom-app"
            iconName={'ion|code'}
            title={'Direct URL'}
            iconSize={32}
            accessibilityLabel="Load your custom app"
            selected={this.state.selectedTab === 'custom-app'}
            onPress={() => { this.setState({selectedTab: 'custom-app',}); }}>
          <CustomApp />
        </TabBarItemIOS>
        <TabBarItemIOS
            name="qr_code_reader"
            iconName={'ion|camera'}
            title={'Scan Code'}
            iconSize={32}
            accessibilityLabel="QR Code Reader"
            selected={this.state.selectedTab === 'qr_code_reader'}
            onPress={() => { this.setState({ selectedTab: 'qr_code_reader', }); }}>
          <QRCodeReader />
        </TabBarItemIOS>
        <TabBarItemIOS
          name="about"
          iconName={'ion|ios-help-outline'}
          title={'About'}
          iconSize={32}
          accessibilityLabel="About Tab"
          selected={this.state.selectedTab === 'about'}
          onPress={() => { this.setState({ selectedTab: 'about', }); }}>
          <About />
        </TabBarItemIOS>
      </TabBarIOS>
    )
  }
});

var styles = StyleSheet.create({
  tabBar: {
  }
});

module.exports = Home;
