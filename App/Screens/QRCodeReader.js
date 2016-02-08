'use strict';

var React = require('react-native');
var generateAppURL = require('../Utilities/generateAppURL');
var StatusBar = require('../Components/StatusBar');
var BarCodeReader = require('../Components/BarCodeReader');

var {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Modal,
} = React;

var reloadApp = require('../Utilities/reloadApp');
var Icon = require('../Components/Icon');
var TimerMixin = require('react-timer-mixin');
var Colors = require('../Utilities/Colors');

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

    reloadApp(generateAppURL(app), app.bundle_path, app.module_name, app.name);
  },

  onBarCodeClose() {
    this.setState({cameraOpen: false});
  },

  render(){
    StatusBar.setStyle('default');

    return (
      this.state.cameraOpen ?
        <Modal isVisible={true}>
          <BarCodeReader onRead={this.onBarCodeRead} onClose={this.onBarCodeClose} />
        </Modal> :
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
                name='camera'
                size={80}
                style={styles.cameraButton}
                color={Colors.grey}
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
