'use strict';

var React = require('react-native');
var Api = require('../Api/Core');

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
    this.props.deleteProfile();
    this.props.navigator.replace({ id: 'login'});
  },

  render() {
    if (Platform.OS === 'ios') {
      StatusBarIOS.setStyle('light-content');
    }

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

var {deleteProfile} = require('../Actions');
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux/native'

export default connect(null,
  (dispatch) => {
    return bindActionCreators({deleteProfile}, dispatch)
  }
)(MyApps)
