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

  _loadURL(url) {
    LinkingIOS.openURL(url);
  },

  render() {
    StatusBarIOS.setStyle(StatusBarIOS.Style.lightContent);
    return (
      <View style={{flex: 1}}>
        <NavigationBar title={'About'} />
        <ScrollView style={styles.contentContainer}>
            <Text style={styles.firstText}>Run React Native apps from <TouchableOpacity onPress={() => this._loadWebsite('https://rnplay.org')}><Text style={styles.link}>rnplay.org</Text></TouchableOpacity> directly on your device.</Text>
            <View style={styles.separator} />
            <Text style={styles.aboutTitle}>How do I exit a loaded app?</Text>
            <Text style={styles.aboutText}>Tap and hold the screen with two fingers simultaneously for 1.5 seconds.</Text>
            <View style={styles.separator} />
            <Text style={styles.aboutTitle}>What does <Text style={{fontStyle: "italic"}}>target</Text> mean?</Text>
            <Text style={styles.aboutText}>The target React Native version for an app. An app might not behave if the target is different than the our bundled React Native version.</Text>
            <View style={styles.separator} />
            <Text style={styles.aboutTitle} numberOfLines={2}>
              What React Native version is this app built with?
            </Text>
            <Text style={styles.aboutText}>
              This app's React Native version is
              <Text style={styles.buildVersionText}> 0.5.0</Text>, released Friday, June 5th, 2015. We will regularly update this app, tracking React Native.
            </Text>
            <View style={styles.separator} />
            <View style={styles.otherQuestions}>
              <Text style={styles.otherQuestionsText}>
                More questions? Pleaes get in touch with us by email. <TouchableOpacity onPress={this._sendEmail}>
                  <Text style={styles.sendEmailText}>info@rnplay.org</Text>
                </TouchableOpacity>

              </Text>
              <View style={{paddingTop: 5}}>
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
  link: {
    color: "#712FA9"
  },

  firstText: {
    paddingRight: 15,
    paddingLeft: 15,
    marginBottom: 30,
    fontSize: 19,
    textAlign: 'left',
  },
  aboutTitle: {
    fontSize: 18,
    marginBottom: 4,
    lineHeight: 20,
    fontFamily: 'Avenir Next',
    paddingLeft: 15,
    paddingRight: 20,
  },
  aboutText: {
    paddingRight: 15,
    paddingLeft: 15,
    marginBottom: 12,
    fontSize: 15,
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
    opacity: 1,
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
