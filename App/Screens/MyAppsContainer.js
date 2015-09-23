/**
 * React Native Playground
 * https://github.com/rnplay/rnplay-ios
 */

'use strict';

var React = require('react-native');
var Overlay = require('react-native-overlay');
var Api = require("../Api/Core");
var NavigationBar = require('../Components/NavigationBar');
var Login = require('../Screens/Login');
var Signup = require('../Screens/Signup');
var MyApps = require('../Screens/MyApps');
var Colors = require('../Utilities/Colors');

var DEFAULT_ROUTE = {id: 'my_apps'};

var {
  ActivityIndicatorIOS,
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Navigator,
  StatusBarIOS,
  Platform,
} = React;

var MyAppsContainer = React.createClass({
  renderScene(route, nav) {
    switch (route.id) {
      case 'my_apps':
        return <MyApps navigator={nav} />;
      case 'login':
        if (Platform.OS === 'ios') {
          return (
            <View style={{flex: 1}}>
              <NavigationBar title={'Account Required'} />
              <Login navigator={nav} error={route.error} />
            </View>
          );
        } else {
          return <Login navigator={nav} error={route.error} />;
        }
      case 'signup':
        return <Signup navigator={nav} />;
      default:
        this.renderAppList();
      }
  },

  render() {
    if (Platform.OS === 'ios') {
      StatusBarIOS.setStyle('light-content');
    }
    if(this.props.profile && this.props.profile.id){
      DEFAULT_ROUTE.id = 'my_apps';
    } else {
      DEFAULT_ROUTE.id = 'login';
    }

    return (
      <Navigator initialRoute={DEFAULT_ROUTE}
                 renderScene={this.renderScene} />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appContainer: {
    marginBottom: 20
  },
  creator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  username: {
    fontSize: 12,
    opacity: .5
  },
  cameraButton: {
    height: 60,
    width: 20,
    alignSelf: 'center',
    marginLeft: 5
  },
  avatar: {
    width: 20,
    height: 20,
    marginRight: 5,
    borderRadius: 10,
    opacity: .5,
    marginTop: 3,
    backgroundColor: "#000"
  },
  cancelButton: {
    color: '#fff',
    flex: 1,
    fontSize: 25,
    marginLeft: 20
  },
  header: {
    textAlign: "center",
    fontSize: 25,
    paddingBottom: 20,
    color: Colors.grey,
  },
  app: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#2B608A'
  }
});

var {updateProfile} = require('../Actions');
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux/native'

export default connect(
  (state) => {
    return {
      profile: state.profile
    }
  }
)(MyAppsContainer)
