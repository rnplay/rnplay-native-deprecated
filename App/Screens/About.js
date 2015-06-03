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
        <NavigationBar title={'About'} />
        <View style={styles.contentContainer}>
            <Text style={styles.aboutTitle}>What's this app for?</Text>
            <Text style={styles.aboutText}>Running React Native apps from rnplay.org directly on your device.</Text>
            <View style={styles.separator} />
            <Text style={styles.aboutTitle}>How do I exit a loaded app?</Text>
            <Text style={styles.aboutText}>Tap the screen with two fingers simultaneously and hold for 1.5 seconds.</Text>
            <View style={styles.separator} />
            <Text style={styles.aboutTitle}>What does target mean?</Text>
            <Text style={styles.aboutText}>Target refers to the React Native build version that a given play is intended for.</Text>
            <View style={styles.separator} />
            <Text style={styles.aboutTitle}>What build version of React Native is this app compatible with?</Text>
            <Text style={styles.aboutText}>This app is currently built against React Native <Text style={styles.buildVersionText}>0.5.0</Text>, released Friday, June 5th, 2015.</Text>
            <View style={styles.separator} />
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  aboutTitle: {
    fontSize: 18,
    marginBottom: 5,
    fontFamily: 'Avenir Next',
    paddingLeft: 15,
    paddingRight: 15,
  },
  aboutText: {
    paddingRight: 15,
    paddingLeft: 15,
    marginBottom: 15,
    fontSize: 14,
    textAlign: 'left',
    color: '#3a3638',
    opacity: 0.5,
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(0,0,0,0.07)",
    marginBottom: 15,
  },
  buildVersionText: {
    fontWeight: 'bold',
  },
});

module.exports = Help;
