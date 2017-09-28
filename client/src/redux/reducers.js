import {
  SAVE_SURVEYS,
} from './actions'

const DEFAULT_STORE = {
	surveys: [],
}

const saveSurveys = (state, action) => {
	return {
		surveys: action.surveys,
	}
}

export default (state = DEFAULT_STORE, action) => {
  switch (action.type) {
    case SAVE_SURVEYS:
      return saveSurveys(state, action)
    default:
      return state
  }
}