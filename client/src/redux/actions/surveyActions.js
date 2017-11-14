import axios from 'axios'
import { API_DOMAIN } from '../../utilities/constants'
import {
  getAccessToken,
  saveVoteToLocalStorage,
} from '../../utilities/utils'

export const SAVE_SURVEYS = 'SAVE_SURVEYS'
export const IS_LOADING = 'IS_LOADING'
export const INCREASE_VOTE = 'INCREASE_VOTE'

export const createNewComment = (commentData) => {
  return dispatch => {
    dispatch(isLoading(true))
    axios
    .post(`${API_DOMAIN}/comment`, commentData, {
      headers: {
        authorization: `Bearer ${getAccessToken()}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.data)
    .then(data => {
      dispatch(isLoading(false))
      if (data.success) {
        dispatch(saveSurveys([data.survey]))
      }
      else {
        // TODO
        console.error('New comment not created. Need to handle this')
      }
    })
  }
}

export const createNewPoll = (pollData) => {
  return dispatch => {
    dispatch(isLoading(true))
    axios
    .post(`${API_DOMAIN}/survey`, pollData, {
      headers: {
        authorization: `Bearer ${getAccessToken()}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.data)
    .then(data => {
      dispatch(isLoading(false))
      if (data.success) {
        dispatch(saveSurveys([data.survey]))
      }
      else {
        // TODO
        console.error('New poll not created. Need to handle this')
      }
    })
  }
}

export const getAllPolls = () => {
  return dispatch => {
    dispatch(isLoading(true))
    axios
		.get(`${API_DOMAIN}/surveys`)
		.then(response => response.data)
		.then(surveys => {
      dispatch(isLoading(false))
			dispatch(saveSurveys(surveys))
		})
  }
}

export const voteOnPoll = (pollId, optionIndex) => {
  return dispatch => {
    dispatch(isLoading(true))
    axios
    .post(`${API_DOMAIN}/vote`, {
      pollId,
      optionIndex,
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.data)
    .then(results => {
      saveVoteToLocalStorage(pollId, optionIndex);
      dispatch(increaseVote(pollId, optionIndex))
      dispatch(isLoading(false))
    })
    // I need to save something to local storage to say that this user has voted for on this poll.
    // That's because it is a requirement that you don't need to be logged in to vote.
  }
}

export const increaseVote = (pollId, optionIndex) => {
  return {
    type: INCREASE_VOTE,
    payload: {
      pollId,
      optionIndex,
    }
  }
}

export const isLoading = (isLoading) => {
  return {
    type: IS_LOADING,
    payload: isLoading,
  }
}

export const saveSurveys = (surveys) => {
  return {
    type: SAVE_SURVEYS,
    payload: surveys,
  }
}