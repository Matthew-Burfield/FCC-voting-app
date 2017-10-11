import axios from 'axios'
import { API_DOMAIN } from '../../utilities/constants'
import { getAccessToken } from '../../utilities/utils'

export const SAVE_SURVEYS = 'SAVE_SURVEYS'
export const IS_LOADING = 'IS_LOADING'

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
        console.log('New poll not created. Need to handle this')
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