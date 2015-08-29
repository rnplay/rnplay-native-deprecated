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
