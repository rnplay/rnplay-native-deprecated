'use strict';

var React = require('react-native');
var NavigationBar = require('../Components/NavigationBar');
var Colors = require('../Utilities/Colors');
var StatusBar = require('../Components/StatusBar');

var {
  StyleSheet,
  Text,
  ScrollView,
  View,
  LinkingIOS,
  TouchableOpacity,
  Image,
  Platform,
  ToolbarAndroid,
} = React;

var {map} = require('lodash');

var About = React.createClass({
  _sendEmail() {
    if (Platform.OS === 'ios') {
      LinkingIOS.openURL('mailto:info@rnplay.org');
    }
  },

  _loadURL(url) {
    if (Platform.OS === 'ios') {
      LinkingIOS.openURL(url);
    }
  },

  renderModules() {
    return map(global.PACKAGE['dependencies'], (version, name) => {
      return <Text key={name} style={styles.moduleText}>{name} {version}</Text>
    })
  },

  render() {
    StatusBar.setStyle('light-content');

    return (
      <View style={styles.container}>
        <ScrollView style={styles.contentContainer} automaticallyAdjustContentInsets={false}>
          <Text style={styles.heading}>React Native Playground</Text>
          <Image style={styles.logo} source={require('image!rnplay_logo_light_w_sand')} />
          <Text style={styles.title}>Run React Native apps from rnplay.org directly on your device.</Text>
          <Text style={styles.text}>Get started by trying apps on the <Text style={styles.emphasis}>Explore</Text> tab, or login to your rnplay.org account in <Text style={styles.emphasis}>My Apps</Text>.</Text>

          <Text style={styles.title}>How do I exit a loaded app?</Text>
          <Text style={styles.text}>Tap and hold the screen with two fingers simultaneously for 1.5 seconds.</Text>

          <Text style={styles.title}>What does target mean?</Text>
          <Text style={styles.text}>The target React Native version for an app. An app might not behave if the target is different than the our bundled React Native version.</Text>

          <Text style={styles.title} numberOfLines={2}>
            What's the current React Native version?
            </Text>
            <Text style={styles.text} numberOfLines={2}>
              The app's current React Native version is
              <Text style={styles.buildVersionText}> {global.RN_VERSION_DISPLAY}</Text>.
            </Text>

            <Text style={styles.title}>Which modules are included?</Text>
            {this.renderModules()}
            <View style={styles.otherQuestions}>
              <Text style={styles.otherQuestionsText}>
                More questions? Please get in touch with us by email: info@rnplay.org
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
  container: {
    flex: 1,
    marginBottom: Platform.OS === 'ios' ? 44 : 0,
  },
  contentContainer: {
    paddingTop: Platform.OS === 'ios' ? 15 : null,
    padding: Platform.OS === 'android' ? 15 : 0,
    flex: 1,
  },
  sendEmailText: {
    color: Colors.tintColor,
    fontSize: 13,
    marginTop: -2,
  },
  link: {
    color: Colors.tintColor,
  },
  emphasis: {
    fontStyle: "italic"
  },
  logo: {
    height: 150,
    width: 150,
    marginBottom: 10,
    alignSelf: 'center',
  },
  heading: {
    fontFamily: 'Avenir Next',
    paddingRight: 15,
    paddingLeft: 15,
    marginBottom: 10,
    fontSize: 24,
    textAlign: 'center'
  },
  title: {
    fontWeight: 'bold',
    color: Colors.darkGrey,
    fontFamily: 'Avenir Next',
    paddingRight: 15,
    paddingLeft: 15,
    marginBottom: 10,
    fontSize: 16
  },
  text: {
    fontFamily: 'Avenir Next',
    paddingRight: 15,
    color: Colors.midGrey,
    paddingLeft: 15,
    marginBottom: 20,
    fontSize: 14
  },
  moduleText: {
    fontFamily: 'Avenir Next',
    paddingRight: 15,
    color: Colors.midGrey,
    paddingLeft: 15,
    fontSize: 14
  },
  otherQuestionsText: {
    opacity: 1,
    fontSize: 13,
  },
  otherQuestions: {
    paddingTop: 20,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 23,
  },
});

module.exports = About;
