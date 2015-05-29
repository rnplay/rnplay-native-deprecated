/**
 * React Native Playground
 * https://github.com/jsierles/rnplay
 */

'use strict';

var React = require('react-native');
var Explore = require('./Explore');
var MyApps = require('./MyApps');
var Settings = require('./Settings');

var SMXTabBarIOS = require('SMXTabBarIOS');
var SMXTabBarItemIOS = SMXTabBarIOS.Item;

var {
  AppRegistry,
  StyleSheet,
  Text,
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
        barTintColor={'white'}>  
        <SMXTabBarItemIOS
          name="explore"
          iconName={'ion|ios-search-strong'}
          title={'Explore'}
          iconSize={32}
          accessibilityLabel="Explore Tab"
          selected={this.state.selectedTab === 'explore'}
          onPress={() => {
            this.setState({
              selectedTab: 'explore',
            });
          }}>
          <Explore />
        </SMXTabBarItemIOS>
        <SMXTabBarItemIOS
            name="my-apps"
            iconName={'ion|ios-briefcase-outline'}
            title={'My Apps'}
            iconSize={32}
            accessibilityLabel="My Apps Tab"
            selected={this.state.selectedTab === 'my-apps'}
            onPress={() => {
            this.setState({
              selectedTab: 'my-apps',
            });
          }}>
          <MyApps />
        </SMXTabBarItemIOS>
        <SMXTabBarItemIOS
            name="settings"
            iconName={'ion|gear-a'}
            title={'Settings'}
            iconSize={32}
            accessibilityLabel="Settings Tab"
            selected={this.state.selectedTab === 'settings'}
            onPress={() => {
            this.setState({
              selectedTab: 'settings',
            });
          }}>
          <Settings />
        </SMXTabBarItemIOS>
      </SMXTabBarIOS>
    )
  }
});

module.exports = Home;
