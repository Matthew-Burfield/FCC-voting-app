import {
	removeLocalTokens,
} from '../../utilities/utils'
import {
  removeUnpublishedPolls
} from './surveyActions'

export const LOGIN_USER = 'LOGIN_USER'
export const LOGOUT_USER = 'LOGOUT_USER'

export const loginUser = (payload) => {
  return {
		type: LOGIN_USER,
		payload,
  }
}

export const logoutUser = () => {
  return dispatch => {
    dispatch(_logoutUser())
    dispatch(removeUnpublishedPolls())
  }
}

const _logoutUser = () => {
  removeLocalTokens()
  return {
    type: LOGOUT_USER,
  }
}
