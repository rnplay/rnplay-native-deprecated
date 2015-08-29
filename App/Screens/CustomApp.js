'use strict';

var React = require('react-native');
var NavigationBar = require('../Components/NavigationBar');
var Api = require('../Api/Core');
var reloadApp = require('../Utilities/reloadApp');

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

var CustomApp = React.createClass({

  getInitialState() {
    return {
      isLoading: false,
      email: '',
      password: '',

    }
  },

  handleSubmit() {
    if(!this.state.url || !this.state.appName) {
      AlertIOS.alert('Error', 'Please fill in all fields',[{text: 'OK'}])
      return;
    }

    this.setState({ isLoading: true });
    reloadApp(this.state.url, this.state.appName);
    this.setState({ isLoading: false });
  },

  render() {
    StatusBarIOS.setStyle('light-content');

    return (
      <View style={styles.mainContainer}>
        <NavigationBar title="Direct URL" />
        <ScrollView>
          <Text style={styles.text}>
            Load your React Native app from any URL, such as your local packager or a javascript bundle.
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="URL"
              keyboardType="url"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
              onSubmitEditing={() => this.refs.appName.focus()}
              style={styles.input}
              onChangeText={(url) => this.setState({url: url})}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              ref="appName"
              placeholder="APP MODULE NAME"
              returnKeyType="done"
              onSubmitEditing={this.handleSubmit}
              style={styles.input}
              onChangeText={(text) => this.setState({appName: text})}
            />
          </View>

          <TouchableHighlight style={styles.button} onPress={this.handleSubmit}>
            <Text style={styles.buttonText}>LOAD & RUN</Text>
          </TouchableHighlight>

          <Text style={styles.helpText}>The module name should match the registered top level component name.</Text>

          <Text style={styles.helpText}>Your app should React Native <Text style={{fontWeight: "700"}}>{global.RN_VERSION_DISPLAY}</Text></Text>

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
    flexDirection: 'column',
    backgroundColor: 'white'
  },
  text: {
    fontFamily: 'Avenir Next',
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 17,
    textAlign: 'center',
  },
  helpText: {
    marginTop: 10,
    paddingHorizontal: 10,
    color: "#888"
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
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
    padding: 10,
    fontFamily: 'Avenir Next',
  },
});

module.exports = CustomApp;
