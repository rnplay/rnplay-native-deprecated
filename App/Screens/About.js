'use strict';

var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
} = React;

var Accordion = require('react-native-accordion');

var About = React.createClass({
  render() {
    return (
      <View>
        <Accordion
           underlayColor="#3a3638"
           header=<Text style={styles.aboutText}>What's this app for?</Text>
           content=<Text style={styles.aboutText}>Running React Natibe apps from rnplay.org directly on your device.</Text>
           easing="easeOutCubic"
         />

         <Accordion
            underlayColor="#3a3638"
            header=<Text style={styles.aboutText}>How do I exit a loaded app?</Text>
            content=<Text style={styles.aboutText}>Tap the same spot four times, quickly.</Text>
            easing="easeOutCubic"
          />
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
