'use strict';

var React = require('react-native');

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
        titleColor="#fff"
        onIconClicked={this.props.handleNavIconTap}
        style={styles.toolbarAndroid} />
    );
  }
});

var styles = StyleSheet.create({
  toolbarAndroid: {
    backgroundColor: '#712FA9',
    height: 56,
  },
});

module.exports = NavigationBar;
