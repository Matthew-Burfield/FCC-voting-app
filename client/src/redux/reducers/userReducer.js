import {
	LOGIN_USER,
	LOGOUT_USER,
} from '../actions/userActions'

const DEFAULT_STORE = {
	authenticated: false,
}

const loginUser = (state, action) => {
	const newUserState = Object.assign({}, state.user, {
		authenticated: true,
		...action.payload,
	})
	return newUserState
}

const logoutUser = (state) => {
	const newUserState = Object.assign({}, state.user, {
		authenticated: false,
	})
	return newUserState
}

export default (state = DEFAULT_STORE, action) => {
  switch (action.type) {
    case LOGIN_USER:
			return loginUser(state, action)	
		case LOGOUT_USER:
      return logoutUser(state)
    default:
      return state
  }
}