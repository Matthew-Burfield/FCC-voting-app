import {
  SAVE_SURVEYS,
} from '../actions/surveyActions'

const DEFAULT_STORE = []

const saveSurveys = (state, action) => {
	return action.surveys
}

export default (state = DEFAULT_STORE, action) => {
  switch (action.type) {
    case SAVE_SURVEYS:
      return saveSurveys(state, action)
    default:
      return state
  }
}