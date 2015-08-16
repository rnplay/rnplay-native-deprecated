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
          <Text style={styles.heading}>React Native Playground</Text>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={require('image!rnplay_logo_light_w_sand')} />
          </View>
          <Text style={styles.title}>Run React Native apps from rnplay.org directly on your device.</Text>
          <Text style={styles.text}>Get started by trying apps on the <Text style={styles.emphasis}>Explore</Text> tab, or login to your rnplay.org account in <Text style={styles.emphasis}>My Apps</Text>.</Text>

          <Text style={styles.title}>How do I exit a loaded app?</Text>
          <Text style={styles.text}>Tap and hold the screen with two fingers simultaneously for 1.5 seconds.</Text>

          <Text style={styles.title}>What does target mean?</Text>
          <Text style={styles.text}>The target React Native version for an app. An app might not behave if the target is different than the our bundled React Native version.</Text>

          <Text style={styles.title} numberOfLines={2}>
            What React Native version is this app built with?
          </Text>
          <Text style={styles.text} numberOfLines={2}>
            This app is currently built against React Native
            <Text style={styles.buildVersionText}> {global.RN_VERSION_DISPLAY}</Text>, released July 17th, 2015.
          </Text>

          <Text style={styles.title}>Which native modules can I use?</Text>
          <Text style={styles.text}>
           react-native-linear-gradient, react-native-overlay, react-native-userdefaults-ios, react-native-blur,
           react-native-camera, react-native-icons, react-native-vector-icons, react-native-addressbook,
           react-native-keyboardevents, react-native-mapbox-gl, react-native-modal, react-native-side-menu,
           react-native-video, react-native-activity-view, react-native-keychain, react-native-webview-bridge,
           react-native-image-picker
           </Text>

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
    color: "#444",
    fontFamily: 'Avenir Next',
    paddingRight: 15,
    paddingLeft: 15,
    marginBottom: 10,
    fontSize: 16
  },
  text: {
    fontFamily: 'Avenir Next',
    paddingRight: 15,
    color: "#222",
    paddingLeft: 15,
    marginBottom: 20,
    fontSize: 14
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
