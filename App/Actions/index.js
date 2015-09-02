import api from '../Api/Core'

import {AsyncStorage} from 'react-native';

export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const DELETE_PROFILE = 'DELETE_PROFILE';
export const FETCH_PROFILE = 'FETCH_PROFILE';

var PREFIX = '@USER:';
var PROFILE_KEY = PREFIX + 'profile';

export function fetchProfile() {
  return dispatch => {
    AsyncStorage.getItem(PROFILE_KEY)
      .then((profileString) => {
        dispatch({
          type: FETCH_PROFILE,
          profile: profileString ? JSON.parse(profileString) :  {}
        })
      })
  }
}

export function updateProfile(data) {
  return dispatch => {
    AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(data))
      .then(() => {
        dispatch({
          type: UPDATE_PROFILE,
          profile: data
        })
      })
  }
}

export function deleteProfile() {
  return dispatch => {
    AsyncStorage.removeItem(PROFILE_KEY)
      .then(() => {
        dispatch({
          type: DELETE_PROFILE
        })
      })
  }
}
