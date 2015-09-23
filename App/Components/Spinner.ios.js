'use strict';

var React = require('react-native');
var Colors = require('../Utilities/Colors');

var {
  ActivityIndicatorIOS,
} = React;

class Spinner extends React.Component {
  render() {
    return (
      <ActivityIndicatorIOS
        color={Colors.tintColor}
        style={{flex: 1}}
        animating={this.props.isLoading}
        size="large" />
    );
  }
}

module.exports = Spinner;
