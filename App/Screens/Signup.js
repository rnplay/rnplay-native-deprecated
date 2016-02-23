'use strict';

var React = require('react-native');
var NavigationBar = require('../Components/NavigationBar');
var Api = require('../Api/Core');
var Colors = require('../Utilities/Colors');

var {
  ActivityIndicatorIOS,
  AlertIOS,
  AsyncStorage,
  ScrollView,
  StyleSheet,
  TextInput,
  Text,
  TouchableHighlight,
  View
} = React;

var Signup = React.createClass({

  getInitialState() {
    return {
      isLoading: false,
      email: '',
      password: '',
      passwordConfirm: '',
    }
  },

  handleSubmit(){
    if(!this.state.email || !this.state.password) {
      AlertIOS.alert('Error', 'Please fill in all fields',[{text: 'OK'}])
      return;
    }
    if(this.state.password !== this.state.passwordConfirm) {
      AlertIOS.alert('Error', 'Passwords do not match.',[{text: 'OK'}])
      return;
    }
    if(this.state.password.length < 5) {
      AlertIOS.alert('Error', 'Please enter a valid password',[{text: 'OK'}])
      return;
    }

    this.setState({ isLoading: true });

    var params = {
      user: {
        email: this.state.email,
        password: this.state.password,
      }
    };

    Api.post('/users', params)
      .then((res) => {
        if(res.error) {
          this.setState({
            error: res.error,
            isLoading: false,
            email: this.state.email,
            password: this.state.password
          });
          AlertIOS.alert('Sign Up Failed', this.state.error,[{text: 'OK'}]);
        } else {
          this.props.updateProfile(res);
          this.setState({ isLoading: false, error: false });
          this.props.navigator.replace({ id: 'home' });
        }
    });
  },

  render(){
    return (
      <View style={styles.mainContainer}>
        <NavigationBar
          title={'Sign Up'}
          onPrev={() => this.props.navigator.pop()}
          prevTitle={'X'}
        />
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
              returnKeyType={'next'}
              onSubmitEditing={() => this.refs.pwConfirm.focus()}
              style={styles.input}
              onChangeText={(text) => this.setState({password: text})}
            />
          </View>

           <View style={styles.inputContainer}>
            <TextInput
              ref="pwConfirm"
              placeholder={"CONFIRM PASSWORD"}
              password={true}
              returnKeyType={'done'}
              onSubmitEditing={this.handleSubmit}
              style={styles.input}
              onChangeText={(text) => this.setState({passwordConfirm: text})}
            />
          </View>

          <TouchableHighlight style={styles.button} onPress={this.handleSubmit}>
            <Text style={styles.buttonText}>SIGN UP</Text>
          </TouchableHighlight>

          <ActivityIndicatorIOS
            animating={this.state.isLoading}
            color={Colors.tintColor}
            size="large">
          </ActivityIndicatorIOS>
        </ScrollView>
      </View>
    )
  }
});

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: 20,
    flexDirection: 'column',
    backgroundColor: 'white'
  },
  inputContainer: {
    borderBottomWidth: 1,
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
    margin: 10
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
    padding: 10,
  }
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
)(Signup)
