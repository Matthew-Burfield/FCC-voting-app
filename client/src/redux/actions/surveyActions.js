export const SAVE_SURVEYS = 'SAVE_SURVEYS'

export const saveSurveys = (surveys) => {
  return {
    type: SAVE_SURVEYS,
    surveys,
  }
}