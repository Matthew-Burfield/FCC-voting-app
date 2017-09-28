import {
  SAVE_SURVEYS,
} from './actions'

const saveSurveys = (state, action) => {
	return {
		surveys: action.surveys,
	}
}

export default (state = {}, action) => {
  switch (action.type) {
    case SAVE_SURVEYS:
      return saveSurveys(state, action)
    default:
      return state
  }
}