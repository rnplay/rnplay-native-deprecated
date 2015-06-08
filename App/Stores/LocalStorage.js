'use strict';

var createStore = require('flux-util').createStore;
var dispatcher = require('../Utilities/AppDispatcher');
var AppConstants = require('../Constants/AppConstants');
var ProfileStore = require('../Stores/ProfileStore');
var React = require('react-native');

var {
  AsyncStorage,
  AlertIOS,
} = React;

var PREFIX = '@USER:';
var PROFILE_KEY = PREFIX + 'profile';

var store = createStore({
  bootstrap(complete) {
    AsyncStorage.getItem(PROFILE_KEY, (error, profile) => {
      if (error) {
        AlertIOS.alert(error.message);
        complete();
      } else {
        ProfileStore.setState(JSON.parse(profile));
        complete();
      }
    })
  },

  dispatcherIndex: dispatcher.register((payload) => {
    var action = payload.action;

    switch(action.actionType) {
      case AppConstants.UPDATE_PROFILE:
        AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(action.data), (error) => {
          store.emitChange(action);
        });
      break;
      case AppConstants.DELETE_PROFILE:
        AsyncStorage.removeItem(PROFILE_KEY)
          .catch((error) => AlertIOS.alert('Error', error.message,[{text: 'OK'}]))
          .done();
      break;
    }

    return true;
  })
});

module.exports = store;
