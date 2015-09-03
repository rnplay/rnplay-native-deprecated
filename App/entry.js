'use strict';

import { AppRegistry, Component } from 'react-native'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import reducer from './Reducers'

const store = applyMiddleware(thunk)(createStore)(reducer)

// store bootstrap

import { Provider } from 'react-redux/native'
import Application from './components/Application'

class RNPlayNative extends Component {
  render() {
    return (
      <Provider store={store}>
        {() => <Application />}
      </Provider>
    )
  }
}

AppRegistry.registerComponent('RNPlayNative', () => RNPlayNative)
