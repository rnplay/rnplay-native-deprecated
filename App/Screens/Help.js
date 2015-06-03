'use strict';

var React = require('react-native');
var NavigationBar = require('../Components/NavigationBar');

var {
  StyleSheet,
  Text,
  View,
  StatusBarIOS,
} = React;

var Help = React.createClass({
  render() {
    StatusBarIOS.setStyle(StatusBarIOS.Style.lightContent);
    return (
      <View>
        <NavigationBar title={'Help'} />
        <View style={styles.contentContainer}>
            <Text style={styles.aboutTitle}>What's this app for?</Text>
            <Text style={styles.aboutText}>Running React Native apps from rnplay.org directly on your device.</Text>
            <Text style={styles.aboutTitle}>How do I exit a loaded app?</Text>
            <Text style={styles.aboutText}>Tap the screen with two fingers simultaneously and hold for 1.5 seconds.</Text>
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  contentContainer: {
    padding: 20,
  },
  aboutTitle: {
    fontSize: 18,
    marginBottom: 15,
  },
  aboutText: {
    marginBottom: 15,
    fontSize: 14,
    textAlign: 'left',
    color: '#3a3638',
    opacity: 0.8,
  },
});

module.exports = Help;
