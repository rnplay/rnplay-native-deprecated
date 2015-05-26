'use strict';

var React = require('react-native');
var NavigationBar = require('../Components/NavigationBar');
var Api = require('../Api/Core');
var AppActions = require('../Actions/AppActions');

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
    return (
      <View style={styles.errorContainer}>
        <Text>{this.props.error}</Text>
      </View>
    )
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
      }
    };

    Api.post('/users/sign_in', params)
      .then((res) => {
        if(res.error) {
          this.setState({
            // error: res.error,
            isLoading: false,
            email: this.state.email,
            password: this.state.password
          });
          AlertIOS.alert('Sign In Failed', this.state.error,[{text: 'OK'}]);
        } else {
          AppActions.updateProfile(res);
          this.setState({ isLoading: false, error: false });
          this.props.navigator.replace({ id: 'home' });
        }
    });
  },

  render(){
    return (
      <View style={styles.mainContainer}>
        <NavigationBar
          title={'Login'}
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
              returnKeyType={'done'}
              onSubmitEditing={this.handleSubmit}
              style={styles.input}
              onChangeText={(text) => this.setState({password: text})}
            />
          </View>

          <TouchableHighlight style={styles.button} onPress={this.handleSubmit}>
            <Text style={styles.buttonText}>LOG IN</Text>
          </TouchableHighlight>
          
          {this.props.error && this.renderError()}

          <ActivityIndicatorIOS
            animating={this.state.isLoading}
            color="#111"
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
  },
  errorContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
  }
});

module.exports = Login;
