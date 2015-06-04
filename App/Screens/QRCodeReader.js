'use strict';

var React = require('react-native');
var Camera = require('react-native-camera');
var generateAppURL = require('../Utilities/generateAppURL');

var {
  StyleSheet,
  Text,
  View,
  StatusBarIOS,
  TouchableOpacity
} = React;

var AppReloader = require('NativeModules').AppReloader;
var Icon = require('FAKIconImage');

var QRCodeReader = React.createClass({

  getInitialState() {
    return {
      cameraOpen: false
    }
  },

  onBarCodeRead(e) {
    var app = JSON.parse(e.data);
    AppReloader.reloadAppWithURLString(generateAppURL(app), app.module_name);
  },

  render(){
    StatusBarIOS.setStyle(StatusBarIOS.Style.lightContent);
    return (
      this.state.cameraOpen ?
      <Camera
        ref="cam"
        style={styles.camera}
        onBarCodeRead={this.onBarCodeRead}>
        <Icon name='ion|close'
          size={50}
          style={styles.cameraButton}
          color='#000' />
      </Camera>  :
       <View style={styles.container}>
         <Text style={styles.text}>
           For apps on rnplay.org, click on 'Run on device', then open the camera and point it at the QR code.
         </Text>
         <TouchableOpacity onPress={() => this.setState({cameraOpen: true})} >
           <Icon
             name='ion|camera'
             size={80}
             style={styles.cameraButton}
             color='#000'
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
    fontSize:20,
    padding: 10,
    marginBottom: 20
  },
  cameraButton: {
    width: 80,
    height: 80
  },
  closebutton: {
    width: 50,
    height: 50,
    backgroundColor: '#aaa'
  }

});

module.exports = QRCodeReader;
