import {
  SAVE_SURVEYS,
} from './actions'

export const saveSurveys = (surveys) => {
  return {
    type: SAVE_SURVEYS,
    surveys,
  }
}
