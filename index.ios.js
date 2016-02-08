'use strict';

import React, { AppRegistry, Component } from 'react-native';
import ApplicationBase from './App/ApplicationBase';

class RNPlayNative extends Component {
  render() {
    return (
      <ApplicationBase />
    );
  }
}

AppRegistry.registerComponent('RNPlayNative', () => RNPlayNative);
