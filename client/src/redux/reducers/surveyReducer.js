import {
  SAVE_SURVEYS,
  IS_LOADING,
} from '../actions/surveyActions'

const DEFAULT_STORE = {
  isLoading: false,
  surveys: {},
}

const saveSurveys = (state, action) => {
  const newSurveyObj = {
    ...JSON.parse(JSON.stringify(state.surveys)),
    ...action.payload,
  }
	return {
    ...state,
    surveys: newSurveyObj,
  }
}

const setIsLoading = (state, action) => {
  return {
    ...state,
    isLoading: action.payload,
  }
}

export default (state = DEFAULT_STORE, action) => {
  switch (action.type) {
    case IS_LOADING:
      return setIsLoading(state, action)
    case SAVE_SURVEYS:
      return saveSurveys(state, action)
    default:
      return state
  }
}