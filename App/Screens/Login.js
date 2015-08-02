'use strict';

var React = require('react-native');
var NavigationBar = require('../Components/NavigationBar');
var Api = require('../Api/Core');
var AppActions = require('../Actions/AppActions');

var {
  ActivityIndicatorIOS,
  AlertIOS,
  ScrollView,
  StyleSheet,
  TextInput,
  Text,
  TouchableHighlight,
  View,
  StatusBarIOS,
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
      AlertIOS.alert('Error', 'Please fill in all fields',[{text: 'OK'}])
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
        remember_me: true,
      }
    };

    Api.post('/users/sign_in', params)
      .then((res) => {
        if(res.error) {
          this.setState({
            isLoading: false,
            email: this.state.email,
            password: this.state.password
          });
          AlertIOS.alert('Sign In Failed', this.state.error,[{text: 'OK'}]);
        } else {
          AppActions.updateProfile(res);
          this.setState({ isLoading: false, error: false });
          this.props.navigator.replace({ id: 'my_apps' });
        }
    });
  },

  render() {
    StatusBarIOS.setStyle('light-content');

    return (
      <View style={styles.mainContainer}>
        <NavigationBar title={'Account Required'} />
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
            <ActivityIndicatorIOS
              animating={this.state.isLoading}
              color="#712FA9"
              size="large">
            </ActivityIndicatorIOS>
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
    backgroundColor: 'white'
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderColor: '#cccccc',
    margin: 10,
  },
  input: {
    height: 40,
    padding: 5,
    fontSize: 14,
    color: 'black',
  },
  button: {
    backgroundColor: '#712FA9',
    margin: 10
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
    padding: 10,
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

module.exports = Login;
