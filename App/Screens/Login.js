'use strict';

var React = require('react-native');
var NavigationBar = require('../Components/NavigationBar');
var Api = require('../Api/Core');
var Colors = require('../Utilities/Colors');
var Alert = require('../Components/Alert');
var Spinner = require('../Components/Spinner');
var StatusBar = require('../Components/StatusBar');

var {
  ActivityIndicatorIOS,
  ScrollView,
  StyleSheet,
  TextInput,
  Text,
  TouchableHighlight,
  View,
  Platform,
  ToastAndroid,
} = React;

var Login = React.createClass({

  getInitialState() {
    return {
      isLoading: false,
      error: false,
      email: '',
      password: '',

    }
  },

  renderError() {
    // return (
    //   <View style={styles.errorContainer}>
    //     <Text style={styles.errorText}>{this.props.error}</Text>
    //   </View>
    // )
  },

  handleSubmit() {
    if(!this.state.email || !this.state.password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if(this.state.password.length < 5) {
      Alert.alert('Error', 'Please enter a valid password.');
      return;
    }

    this.setState({ isLoading: true });

    var params = {
      user: {
        email: this.state.email,
        password: this.state.password,
        remember_me: true,
      }
    };

    Api.post('/users/sign_in', params)
      .then((res) => {
        if (res.error) {
          this.setState({
            isLoading: false,
            email: this.state.email,
            password: this.state.password
          });
          Alert.alert('Sign In Failed', res.error);
        } else {
          this.props.updateProfile(res);
          this.setState({ isLoading: false, error: false });
          this.props.navigator.replace({ id: 'my_apps' });
        }
    });
  },

  render() {
    StatusBar.setStyle('light-content');

    return (
      <View style={styles.mainContainer}>
        <ScrollView>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder={"EMAIL"}
              keyboardType={'email-address'}
              autoCapitalize={"none"}
              autoCorrect={false}
              returnKeyType={'next'}
              onSubmitEditing={() => this.refs.pwField.focus()}
              style={styles.input}
              onChangeText={(text) => this.setState({email: text})}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              ref="pwField"
              placeholder={"PASSWORD"}
              password={true}
              returnKeyType={'done'}
              onSubmitEditing={this.handleSubmit}
              style={styles.input}
              onChangeText={(text) => this.setState({password: text})}
            />
          </View>

          <TouchableHighlight style={styles.button} onPress={this.handleSubmit}>
            <Text style={styles.buttonText}>SIGN IN</Text>
          </TouchableHighlight>

          {this.props.error && this.renderError()}

          <View style={{alignItems: 'center'}}>
            <Spinner isLoading={this.state.isLoading} />
          </View>
        </ScrollView>
      </View>
    )
  }
});

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? 20 : null,
  },
  inputContainer: {
    borderBottomWidth: Platform.OS === 'ios' ? 1 : null,
    borderColor: Colors.lightGrey,
    margin: 10,
  },
  input: {
    height: 40,
    padding: 5,
    fontSize: 14,
    color: 'black',
  },
  button: {
    backgroundColor: Colors.tintColor,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    height: 45,
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Avenir Next',
  },
  errorContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  errorText: {
    opacity: 0.6,
  },
});

var {updateProfile} = require('../Actions');
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

module.exports = connect(
  (state) => {
    return {
      profile: state.profile
    }
  },
  (dispatch) => {
    return bindActionCreators({updateProfile}, dispatch)
  }
)(Login)
