'use strict';

var React = require('react-native');

var {
  ToolbarAndroid,
  StyleSheet,
} = React;

var NavigationBar = React.createClass({
  _handleNavIconTap() {
    console.log('navIcon tapped');
  },

  render() {
    return (
      <ToolbarAndroid
        title={this.props.title}
        navIcon={require("image!ic_menu_white_24dp")}
        onActionSelected={this.onActionSelected}
        titleColor="#fff"
        onIconClicked={this._handleNavIconTap}
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
