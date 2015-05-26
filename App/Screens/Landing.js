'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');

var {
  Navigator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
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

  render(){
    return (
      <View style={styles.mainContainer}>
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
    backgroundColor: 'white'
  },
  optionsContainer: {
    width: Dimensions.get('window').width,
    position: 'absolute',
    bottom: 20
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#712FA9',
    padding: 10,
  }
});

module.exports = Landing;
