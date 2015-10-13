'use strict';

var React = require('react-native');
var Colors = require('../Utilities/Colors');
var BarcodeScanner = require('react-native-barcodescanner');

var {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToolbarAndroid,
} = React;

var BarCodeReader = React.createClass({
  barcodeReceived(e) {
    console.log('Barcode: ' + e.data);
    console.log('Type: ' + e.type);
    this.props.onRead(e);
  },

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ToolbarAndroid
          title='Close'
          titleColor="white"
          navIcon={require("image!ic_clear_white_36dp")}
          onIconClicked={this.props.onClose}
          style={styles.toolbarAndroid} />
        <BarcodeScanner
          onBarCodeRead={this.barcodeReceived}
          style={{ flex: 1 }}
          torchMode='off'
          cameraType='back'
        />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  toolbarAndroid: {
    backgroundColor: Colors.tintColor,
    height: 56,
  },
});

module.exports = BarCodeReader;
