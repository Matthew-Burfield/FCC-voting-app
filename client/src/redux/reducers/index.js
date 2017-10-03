import { combineReducers } from 'redux'
import surveys from './surveyReducer'
import user from './userReducer'

export default combineReducers({
	surveys,
	user,
})
