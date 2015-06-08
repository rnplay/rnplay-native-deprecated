'use strict';

var createStore = require('flux-util').createStore;
var dispatcher = require('../Utilities/AppDispatcher');
var AppConstants = require('../Constants/AppConstants');

var _profile = {};

var store = createStore({
  setState(profile) {
    _profile = profile || {};
  },

  getState() {
    return _profile;
  },

  dispatcherIndex: dispatcher.register((payload) => {
    var action = payload.action;
    
    switch(action.actionType) {
      case AppConstants.UPDATE_PROFILE:
        _profile = action.data;
        store.emitChange(action);
        break;
      case AppConstants.DELETE_PROFILE:
        _profile = {};
        store.emitChange(action);
        break;
    }

    return true;
  })
});

module.exports = store;
