'use strict';

var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
} = React;

var About = React.createClass({
  render() {
    return (
      <View>
        <Text style={styles.aboutTitle}>React Native Playground</Text>
        <Text style={styles.aboutText}>What is this app?</Text>
        <Text style={styles.aboutText}>How do I exit loaded apps?</Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  aboutTitle: {
    fontSize: 18,
  },
  aboutText: {
    marginTop: 15,
    fontSize: 14,
    textAlign: 'left',
    color: '#3a3638',
    opacity: 0.8,
  },
});

module.exports = About;
