'use strict';

var React = require('react-native');
var Api = require('../Api/Core');

var {
  TouchableOpacity,
  View,
  Platform,
} = React;

var AppList = require("../Components/AppList");
var NavigationBar = require('../Components/NavigationBar');
var StatusBar = require('../Components/StatusBar');

var MyApps = React.createClass({

  _signOut() {
    Api.delete('/users/sign_out');
    this.props.deleteProfile();
    this.props.navigator.replace({ id: 'login'});
  },

  _renderIOSNavBar() {
    if (Platform.OS === 'ios') {
      return (
        <NavigationBar
          title={'My Apps'}
          nextTitle={'Sign Out'}
          onNext={this._signOut}/>
      );
    } else {
      return <View />;
    }
  },

  render() {
    StatusBar.setStyle('light-content');

    return (
      <View style={{flex: 1}}>
        {this._renderIOSNavBar()}
        <AppList
          url="/apps.json"
          autoAdjustInsets={false}
          hideCreator={true} />
      </View>
    )
  }
});

var {deleteProfile} = require('../Actions');
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux/native'

export default connect(
  (state) => {
    return {
      profile: state.profile
    }
  },
  (dispatch) => {
    return bindActionCreators({deleteProfile}, dispatch)
  }
)(MyApps)
