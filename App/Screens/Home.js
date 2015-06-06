/**
 * React Native Playground
 * https://github.com/jsierles/rnplay
 */

'use strict';

var React = require('react-native');
var Explore = require('./Explore');
var MyAppsContainer = require('./MyAppsContainer');
var Settings = require('./Settings');
var About = require('./About');
var QRCodeReader = require('./QRCodeReader');

var SMXTabBarIOS = require('SMXTabBarIOS');
var SMXTabBarItemIOS = SMXTabBarIOS.Item;

var {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity
} = React;

var Home = React.createClass({
  getInitialState() {
    return {
      selectedTab: 'explore',
    };
  },

  render() {
    return (
      <SMXTabBarIOS
        selectedTab={this.state.selectedTab}
        tintColor={'#712FA9'}
        style={styles.tabBar}
        barTintColor={'white'}>

        <SMXTabBarItemIOS
          name="explore"
          iconName={'ion|ios-search-strong'}
          title={'Explore'}
          iconSize={32}
          accessibilityLabel="Explore Tab"
          selected={this.state.selectedTab === 'explore'}
          onPress={() => { this.setState({ selectedTab: 'explore', }); }}>
          <Explore />
        </SMXTabBarItemIOS>

        <SMXTabBarItemIOS
            name="my-apps"
            iconName={'ion|ios-briefcase-outline'}
            title={'My Apps'}
            iconSize={32}
            accessibilityLabel="My Apps Tab"
            selected={this.state.selectedTab === 'my-apps'}
            onPress={() => { this.setState({selectedTab: 'my-apps',}); }}>
          <MyAppsContainer />
        </SMXTabBarItemIOS>

        <SMXTabBarItemIOS
            name="qr_code_reader"
            iconName={'ion|camera'}
            title={'Scan Code'}
            iconSize={32}
            accessibilityLabel="QR Code Reader"
            selected={this.state.selectedTab === 'qr_code_reader'}
            onPress={() => { this.setState({ selectedTab: 'qr_code_reader', }); }}>
          <QRCodeReader />
        </SMXTabBarItemIOS>

        <SMXTabBarItemIOS
          name="about"
          iconName={'ion|ios-help-outline'}
          title={'About'}
          iconSize={32}
          accessibilityLabel="About Tab"
          selected={this.state.selectedTab === 'about'}
          onPress={() => { this.setState({ selectedTab: 'about', }); }}>
          <About />
        </SMXTabBarItemIOS>

        <SMXTabBarItemIOS
            name="settings"
            iconName={'ion|gear-a'}
            title={'Settings'}
            iconSize={32}
            accessibilityLabel="Settings Tab"
            selected={this.state.selectedTab === 'settings'}
            onPress={() => { this.setState({ selectedTab: 'settings', }); }}>
          <Settings />
        </SMXTabBarItemIOS>
      </SMXTabBarIOS>
    )
  }
});

var styles = StyleSheet.create({
  tabBar: {
  }
});

module.exports = Home;
