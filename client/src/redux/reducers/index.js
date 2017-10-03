import { combineReducers } from 'redux'
import surveyReducers from './surveyReducers'
import userReducers from './userReducers'

export default combineReducers({
	surveyReducers,
	userReducers,
})
