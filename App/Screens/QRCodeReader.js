'use strict';

var React = require('react-native');
var Camera = require('react-native-camera');
var generateAppURL = require('../Utilities/generateAppURL');
var Overlay = require('react-native-overlay');

var {
  StyleSheet,
  Text,
  View,
  StatusBarIOS,
  TouchableOpacity
} = React;

var reloadApp = require('../Utilities/reloadApp');
var Icon = require('FAKIconImage');
var TimerMixin = require('react-timer-mixin');


var QRCodeReader = React.createClass({
  mixins: [TimerMixin],

  getInitialState() {
    return {
      cameraOpen: false
    }
  },

  onBarCodeRead(e) {
    var app = JSON.parse(e.data);
    this.setTimeout(
      () => {
        this.setState({cameraOpen: false});
      }
    )

    reloadApp(generateAppURL(app), app.module_name);
  },

  render(){
    StatusBarIOS.setStyle('light-content');
    return (
      this.state.cameraOpen ?
        <Overlay isVisible={true}>
          <Camera
            ref="cam"
            style={styles.camera}
            onBarCodeRead={this.onBarCodeRead}>
            <TouchableOpacity onPress={() => this.setState({cameraOpen: false}) } >
              <Icon name='ion|close'
                size={30}
                style={styles.closeButton}
                color='#fff' />
            </TouchableOpacity>
          </Camera>
        </Overlay> :
          <View style={styles.container}>
            <Text style={styles.text}>
              On rnplay.org, find an app.
            </Text>
            <Text style={styles.text}>
              Click <Text style={styles.runOnDevice}>Run on device</Text>.
            </Text>
            <Text style={styles.text}>
              Tap below and point the camera at the displayed code.
            </Text>

            <TouchableOpacity onPress={() => this.setState({cameraOpen: true})} >
              <Icon
                name='ion|camera'
                size={80}
                style={styles.cameraButton}
                color='#777'
              />
            </TouchableOpacity>
          </View>
    )
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  camera: {
    flex: 1
  },
  text: {
    fontSize:18,
    padding: 20,
    fontFamily: "Avenir Next",
    textAlign: 'center',
  },
  runOnDevice: {
    fontStyle: 'italic'
  },
  cameraButton: {
    width: 80,
    height: 80,
    backgroundColor: 'transparent'
  },
  closeButton: {
    width: 30,
    height: 30,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 30,
    right: 20
  }

});

module.exports = QRCodeReader;
