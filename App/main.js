// global setup
global.self = global;

var Promise = require('bluebird')
// we still want to see the red screen of death when
// we have issues like wrong variables etc. within a promise chain
Promise.onPossiblyUnhandledRejection((error) =>{
  throw error;
});

import { AppRegistry } from 'react-native'

import Application from './components/Application'

import Debug from 'debug'
let debug = Debug('wt:app')
Debug.enable('wt:*')

AppRegistry.registerComponent('RNPlayNative', () => Application)
