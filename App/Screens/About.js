'use strict';

var React = require('react-native');
var NavigationBar = require('../Components/NavigationBar');

var {
  StyleSheet,
  Text,
  ScrollView,
  View,
  StatusBarIOS,
  LinkingIOS,
  TouchableOpacity,
} = React;

var Help = React.createClass({
  _sendEmail() {
    LinkingIOS.openURL('mailto:info@rnplay.org');
  },

  render() {
    StatusBarIOS.setStyle(StatusBarIOS.Style.lightContent);
    return (
      <View style={{flex: 1}}>
        <NavigationBar title={'About'} />
        <ScrollView style={styles.contentContainer}>
            <Text style={styles.aboutTitle}>What is this app for?</Text>
            <Text style={styles.aboutText}>Running React Native apps from rnplay.org directly on your device.</Text>
            <View style={styles.separator} />
            <Text style={styles.aboutTitle}>How do I exit a loaded app?</Text>
            <Text style={styles.aboutText}>Tap and hold the screen with two fingers simultaneously for 1.5 seconds.</Text>
            <View style={styles.separator} />
            <Text style={styles.aboutTitle}>What does target mean?</Text>
            <Text style={styles.aboutText}>Target refers to the React Native build version that a given play is intended for.</Text>
            <View style={styles.separator} />
            <Text style={styles.aboutTitle} numberOfLines={2}>
              What React Native version is this app built with?
            </Text>
            <Text style={styles.aboutText} numberOfLines={2}>
              This app is currently built against React Native
              <Text style={styles.buildVersionText}> 0.5.0</Text>, released Friday, June 5th, 2015.
            </Text>
            <View style={styles.separator} />
            <View style={styles.otherQuestions}>
              <Text style={styles.otherQuestionsText}>
                If you would like to get in touch with us for any reason, we can be reached by email.
              </Text>
              <View style={{paddingTop: 5}}>
                <TouchableOpacity onPress={this._sendEmail}>
                  <Text style={styles.sendEmailText}>info@rnplay.org</Text>
                </TouchableOpacity>
              </View>
            </View>
        </ScrollView>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  contentContainer: {
    marginTop: -10,
    paddingBottom: 20,
    flex: 1,
  },
  sendEmailText: {
    color: '#712FA9',
    fontSize: 13,
    marginTop: -2,
  },
  aboutTitle: {
    fontSize: 18,
    marginBottom: 0,
    lineHeight: 20,
    fontFamily: 'Avenir Next',
    paddingLeft: 15,
    paddingRight: 15,
  },
  aboutText: {
    paddingRight: 15,
    paddingLeft: 15,
    marginBottom: 12,
    fontSize: 13,
    textAlign: 'left',
    color: '#3a3638',
    opacity: 0.5,
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(0,0,0,0.07)",
    marginBottom: 14,
  },
  buildVersionText: {
    fontWeight: 'bold',
  },
  otherQuestionsText: {
    opacity: 0.4,
    fontSize: 13,
  },
  otherQuestions: {
    paddingTop: 0,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 23,
  }
});

module.exports = Help;