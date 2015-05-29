'use strict';

var React = require('react-native');
var NavigationBar = require('../Components/NavigationBar');

var {
  StyleSheet,
  Text,
  View
} = React;

var Settings = React.createClass({

  render(){
    return (
      <View style={styles.mainContainer}>
        <NavigationBar title={'Settings'} />
      </View>
    )
  }
});

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white'
  },

});

module.exports = Settings;
