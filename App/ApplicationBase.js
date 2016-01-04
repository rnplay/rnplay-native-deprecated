'use strict';

import React, { AppRegistry, Component, Platform } from 'react-native'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import reducer from './Reducers'

const store = applyMiddleware(thunk)(createStore)(reducer)

// store bootstrap

import { Provider } from 'react-redux/native'
import Application from './Components/Application'

// globals are bad, we make an exception here for now
global.PACKAGE = require('../package.json');
//TODO: Change this back when moving to 0.13 stable
var RN_VERSION = '0.17.0'; //global.PACKAGE.dependencies['react-native'];
global.RN_VERSION_DISPLAY = RN_VERSION;
var githubPrefix = 'rnplay/react-native#';
RN_VERSION = RN_VERSION.replace(githubPrefix, '').replace(/\./g,'').replace(/-/g, '')

global.RN_VERSION = RN_VERSION;
global.PLATFORM = Platform.OS;

class ApplicationBase extends Component {
  render() {
    return (
      <Provider store={store}>
        {() => <Application />}
      </Provider>
    )
  }
}

module.exports = ApplicationBase;
