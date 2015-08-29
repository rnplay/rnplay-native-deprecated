import { FETCH_PROFILE, UPDATE_PROFILE, DELETE_PROFILE } from '../actions'

export default function profile(state = {}, action) {

  switch (action.type) {

  case FETCH_PROFILE:

    return {
      ...state,
      profile: action.profile
    }

  case UPDATE_PROFILE:

    return {
      ...state,
      profile: action.profile
    }

  case DELETE_PROFILE:

    return {
      ...state,
      profile: null
    };

  default:
    return state;
  }
}
