'use strict';

var React = require('react-native');
var Colors = require('../Utilities/Colors');

var {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} = React;

var BarCodeReader = React.createClass({
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Sorry, this feature is not yet implemented for Android.
        </Text>
        <TouchableOpacity style={styles.closeButton} onPress={this.props.onClose} >
          <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 22,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: Colors.tintColor,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    height: 45,
    width: 300,
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Avenir Next',
  },
});

module.exports = BarCodeReader;
