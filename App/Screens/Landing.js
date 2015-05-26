'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');

var {
  Navigator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} = React;

var Landing = React.createClass({

  renderLogin(){
    this.props.navigator.push({
      id: 'login',
      sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
      disableGestures: true
    })
  },

  renderSignup(){
    this.props.navigator.push({
      id: 'signup',
      sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
      disableGestures: true
    })
  },

  renderGuest(){
    this.props.navigator.push({
      id: 'guest',
      sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
      disableGestures: true
    })
  },

  render(){
    return (
      <View style={styles.mainContainer}>
          <Image resizeMode="contain" style={styles.logo} source={{uri: 'https://rnplay.org/assets/header_logo-e96d5680947c01bb1ebe7f56176a9b12fcc5556f294a1e6001275d245705bbd2.png'}} />
          <Text style={styles.title}>React Native Playground</Text>
          <TouchableOpacity onPress={this.renderGuest}>
            <Text style={styles.buttonText}>Browse recent plays</Text>
          </TouchableOpacity>
        <View style={styles.optionsContainer}>
          <View style={styles.options}>
            <TouchableOpacity onPress={this.renderSignup}>
              <Text style={styles.buttonText}>SIGN UP</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.renderLogin}>
              <Text style={styles.buttonText}>LOG IN</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
});

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  optionsContainer: {
    width: Dimensions.get('window').width,
    position: 'absolute',
    bottom: 20
  },
  title: {
    color: '#eee',
    marginTop: 20,
    fontFamily: "Avenir Next",
    marginBottom: 40,
    textAlign: 'center',
    fontSize: 50
  },
  logo: {
    width: 60,
    height: 60
  },

  options: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "Avenir Next",
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    padding: 10,
  }
});

module.exports = Landing;
