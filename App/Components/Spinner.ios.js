'use strict';

var React = require('react-native');

var {
  ActivityIndicatorIOS,
} = React;

class Spinner extends React.Component {
  render() {
    return (
      <ActivityIndicatorIOS
        color={'#712FA9'}
        style={{flex: 1}}
        animating={this.props.isLoading}
        size="large" />
    );
  }
}

module.exports = Spinner;
