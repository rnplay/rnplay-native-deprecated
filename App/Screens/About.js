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
  Image,
} = React;

var Help = React.createClass({
  _sendEmail() {
    LinkingIOS.openURL('mailto:info@rnplay.org');
  },

  _loadURL(url) {
    LinkingIOS.openURL(url);
  },

  render() {
    StatusBarIOS.setStyle('light-content');
    return (
      <View style={{flex: 1}}>
        <NavigationBar title={'About'} />
        <ScrollView style={styles.contentContainer}>
          <Text style={styles.titleText}>React Native Playground</Text>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={require('image!rnplay_logo_light_w_sand')} />
          </View>
          <Text style={styles.firstText}>Run React Native apps from <TouchableOpacity onPress={() => this._loadURL('https://rnplay.org')}><Text style={styles.link}>rnplay.org</Text></TouchableOpacity> directly on your device.</Text>
          <Text style={styles.aboutText}>Get started by trying apps on the <Text style={styles.emphasis}>Explore</Text> tab, or login to your rnplay.org account in <Text style={styles.emphasis}>My Apps</Text>.</Text>
          <View style={styles.separator} />
          <Text style={styles.aboutTitle}>How do I exit a loaded app?</Text>
          <Text style={styles.aboutText}>Tap and hold the screen with two fingers simultaneously for 1.5 seconds.</Text>
          <View style={styles.separator} />
          <Text style={styles.aboutTitle}>What does <Text style={styles.emphasis}>target</Text> mean?</Text>
          <Text style={styles.aboutText}>The target React Native version for an app. An app might not behave if the target is different than the our bundled React Native version.</Text>
          <View style={styles.separator} />
          <Text style={styles.aboutTitle} numberOfLines={2}>
            What React Native version is this app built with?
          </Text>
          <Text style={styles.aboutText} numberOfLines={2}>
            This app is currently built against React Native
            <Text style={styles.buildVersionText}> {global.RN_VERSION_DISPLAY}</Text>, released July 17th, 2015.
          </Text>
          <View style={styles.separator} />

          <Text style={styles.aboutTitle}>Which native modules can I use?</Text>
          <Text style={styles.aboutText}>Check the <TouchableOpacity onPress={() => LinkingIOS.openURL("https://github.com/rnplay/rnplay-ios/blob/master/package.json")}><Text style={{color: 'blue'}}>package.json for this release</Text></TouchableOpacity> for reference.</Text>
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
  emphasis: {
    fontStyle: "italic"
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    height: 150,
    width: 150,
    marginBottom: 10,
  },
  titleText: {
    fontFamily: 'Avenir Next',
    paddingRight: 15,
    paddingLeft: 15,
    marginBottom: 10,
    fontSize: 24,
    textAlign: 'center',
  },
  firstText: {
    fontFamily: 'Avenir Next',
    paddingRight: 15,
    paddingLeft: 15,
    marginBottom: 20,
    fontSize: 20,
    textAlign: 'center',
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
