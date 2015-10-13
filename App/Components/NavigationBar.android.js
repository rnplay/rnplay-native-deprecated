'use strict';

var React = require('react-native');
var Colors = require('../Utilities/Colors');

var {
  ToolbarAndroid,
  StyleSheet,
} = React;

var NavigationBar = React.createClass({
  render() {
    return (
      <ToolbarAndroid
        title={this.props.title}
        navIcon={require("image!ic_menu_white_24dp")}
        onActionSelected={this.onActionSelected}
        titleColor="white"
        onIconClicked={this.props.handleNavIconTap}
        style={styles.toolbarAndroid} />
    );
  }
});

var styles = StyleSheet.create({
  toolbarAndroid: {
    backgroundColor: Colors.tintColor,
    height: 56,
  },
});

module.exports = NavigationBar;
