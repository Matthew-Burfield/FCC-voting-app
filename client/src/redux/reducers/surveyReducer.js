import {
  ADD_COMMENT,
  SAVE_SURVEYS,
  IS_LOADING,
  INCREASE_VOTE,
  REMOVE_SURVEY,
} from '../actions/surveyActions'

const DEFAULT_STORE = {
  isLoading: false,
  surveys: {},
}

const addComment = (state, action) => {
  const surveysClone = JSON.parse(JSON.stringify(state.surveys))
  if (surveysClone && surveysClone[action.payload.id] && surveysClone[action.payload.id].comments) {
    surveysClone[action.payload.id].comments.push({
      value: action.payload.comment,
      datetime: action.payload.datetime,
    })
  }
	return {
    ...state,
    surveys: {
      ...surveysClone,
    },
  }
}

const increaseVote = (state, action) => {
  const stateClone = JSON.parse(JSON.stringify(state))
  stateClone.surveys[action.payload.pollId].pollOptions[action.payload.optionIndex].votes++
  return stateClone
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

const removeSurvey = (state, action) => {
  // This is a quick way to deep clone an object. There are a couple of gotchas however,
  // 1. Functions don't get copied because the JSON parser can't handle them
  // 2. Dates object get stuffed up. I'm using UTC format for storing dates though, which is fine.
  const surveysClone = JSON.parse(JSON.stringify(state.surveys))
  delete surveysClone[action.payload.id]
	return {
    ...state,
    surveys: {
      ...surveysClone,
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
    case INCREASE_VOTE:
      return increaseVote(state, action)
    case REMOVE_SURVEY:
      return removeSurvey(state, action)
    case ADD_COMMENT:
      return addComment(state, action)
    default:
      return state
  }
}