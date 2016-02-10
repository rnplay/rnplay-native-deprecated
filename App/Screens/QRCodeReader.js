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

const Portal = require('react-native/Libraries/Portal/Portal.js');

var reloadApp = require('../Utilities/reloadApp');
var Icon = require('../Components/Icon');
var TimerMixin = require('react-timer-mixin');
var Colors = require('../Utilities/Colors');

let portalTag;

var QRCodeReader = React.createClass({
  mixins: [TimerMixin],

  getInitialState() {
    return {
      cameraOpen: false
    }
  },

  componentWillMount() {
    portalTag = Portal.allocateTag();
  },

  componentWillUnmount() {
    portalTag = null;
  },

  onBarCodeRead(e) {
    var app = JSON.parse(e.data);
    this.setTimeout(
      () => {
        if (Platform.OS === 'android') {
          Portal.closeModal(portalTag);
        }
        else {
          this.setState({cameraOpen: false});
        }
      }
    )

    reloadApp(generateAppURL(app), app.bundle_path, app.module_name, app.name);
  },

  onBarCodeClose() {
    if (Platform.OS === 'android') {
      Portal.closeModal(portalTag);
    }
    else {
      this.setState({cameraOpen: false});
    }
  },

  onCameraOpen() {
    if (Platform.OS === 'android') {
      Portal.showModal(portalTag, this.renderBarCodeReader());
    }
    else {
      this.setState({cameraOpen: true});
    }
  },

  renderBarCodeReader() {
    return (
      <BarCodeReader onRead={this.onBarCodeRead} onClose={this.onBarCodeClose} />
    );
  },

  render(){
    StatusBar.setStyle('default');

    return (
      this.state.cameraOpen ?
        <Modal isVisible={true}>
          {this.renderBarCodeReader()}
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

            <TouchableOpacity onPress={this.onCameraOpen} >
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
