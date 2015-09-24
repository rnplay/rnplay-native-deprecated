'use strict';

var React = require('react-native');
var NavigationBar = require('../Components/NavigationBar');
var Api = require('../Api/Core');
var reloadApp = require('../Utilities/reloadApp');
var Colors = require('../Utilities/Colors');
var StatusBar = require('../Components/StatusBar');
var Alert = require('../Components/Alert');
var Spinner = require('../Components/Spinner');

var {
  ActivityIndicatorIOS,
  ScrollView,
  StyleSheet,
  TextInput,
  Text,
  TouchableHighlight,
  View,
  Platform,
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
      Alert.alert('Error', 'Please fill in all fields')
      return;
    }

    this.setState({ isLoading: true });
    reloadApp(this.state.url, this.state.appName);
    this.setState({ isLoading: false });
  },

  render() {
    StatusBar.setStyle('light-content');

    return (
      <View style={styles.mainContainer}>
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

          <Text style={styles.helpText}>Your app should support React Native <Text style={{fontWeight: "700"}}>{global.RN_VERSION_DISPLAY}</Text></Text>

          <Spinner isLoading={this.state.isLoading} />
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
    padding: Platform.OS === 'android' ? 15 : 0,
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
    color: Colors.grey,
  },
  inputContainer: {
    borderBottomWidth: Platform.OS === 'ios' ? 1 : null,
    borderColor: Colors.lightGrey,
    margin: Platform.OS == 'ios' ? 10 : null,
    marginBottom: Platform.OS === 'android' ? 10 : null,
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
    margin: Platform.OS == 'ios' ? 10 : null,
    marginBottom: Platform.OS === 'android' ? 10 : null,
    height: 45,
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Avenir Next',
  },
});

module.exports = CustomApp;
