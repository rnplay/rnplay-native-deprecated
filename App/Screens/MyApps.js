'use strict';

var React = require('react-native');

var {
  TouchableOpacity,
  View,
  StatusBarIOS,
} = React;

var AppList = require("../Components/AppList");
var NavigationBar = require('../Components/NavigationBar');

var MyApps = React.createClass({
  render() {
    StatusBarIOS.setStyle(StatusBarIOS.Style.lightContent);

    return (
      <View style={{flex: 1}}>
        <NavigationBar title={'My Apps'} />
        <AppList url="/apps.json" hideCreator={true} />
      </View>
    )
  }
});

module.exports = MyApps;
