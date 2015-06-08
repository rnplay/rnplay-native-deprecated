var dispatcher = require('../Utilities/AppDispatcher');
var AppConstants = require('../Constants/AppConstants');
var Api = require('../Api/Core');

module.exports = {
  updateProfile(profile) {
    dispatcher.handleViewAction({
      actionType: AppConstants.UPDATE_PROFILE,
      data: profile
    });
  },
  deleteProfile() {
    dispatcher.handleViewAction({
      actionType: AppConstants.DELETE_PROFILE    
    });
  },
}
