'use strict';

var React = require('react-native');
var Api = require('../Api/Core');
var AppActions = require('../Actions/AppActions');

var {
  TouchableOpacity,
  View,
  StatusBarIOS,
} = React;

var AppList = require("../Components/AppList");
var NavigationBar = require('../Components/NavigationBar');

var MyApps = React.createClass({

  _signOut() {
    Api.delete('/users/sign_out');
    AppActions.deleteProfile();
    this.props.navigator.replace({ id: 'login'});
  },

  render() {
    StatusBarIOS.setStyle(StatusBarIOS.Style.lightContent);

    return (
      <View style={{flex: 1}}>
        <NavigationBar
          title={'My Apps'}
          nextTitle={'Sign Out'}
          onNext={this._signOut}/>
        <AppList url="/apps.json" hideCreator={true} />
      </View>
    )
  }
});

module.exports = MyApps;
