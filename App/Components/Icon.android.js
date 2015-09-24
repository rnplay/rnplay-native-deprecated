'use strict';

var React = require('react-native');

var {
  Image,
} = React;

var Icon = React.createClass({
  render() {
    return(
      <Image
        source={{uri: this.props.name}}
        style={[this.props.style, {
          height: this.props.size,
          width: this.props.size,
          tintColor: this.props.color,
          borderRadius: 0.000001, // Hack to enable tintColor: https://github.com/facebook/react-native/issues/2769#issuecomment-140840163
        }]}
      />
    );
  }
});

module.exports = Icon;
