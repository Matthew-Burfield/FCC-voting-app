import {
  SAVE_SURVEYS,
  IS_LOADING,
} from '../actions/surveyActions'

const DEFAULT_STORE = {
  isLoading: false,
  surveys: {},
}

const saveSurveys = (state, action) => {
  // This is a quick way to deep clone an object. There are a couple of gotchas however,
  // 1. Functions don't get copied because the JSON parser can't handle them
  // 2. Dates object get stuffed up. I'm using UTC format for storing dates though, which is fine.
  const surveysClone = JSON.parse(JSON.stringify(state.surveys))
	return {
    ...state,
    surveys: {
      ...surveysClone,
      ...action.payload,
    },
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