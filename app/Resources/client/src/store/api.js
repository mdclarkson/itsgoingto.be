import { questionSelector, updatePoll, updateResponses } from './poll'
import { answersSelector } from './answers'

// ------------------------------------
// Constants
// ------------------------------------
export const ROUTE_POLL = '/api/polls'
export const ROUTE_RESPONSES = '/responses'

// ------------------------------------
// Helpers
// ------------------------------------
function APIError (details) {
  this.name = 'APIError'
  this.details = details
}
APIError.prototype = Object.create(Error.prototype)
APIError.prototype.constructor = APIError

// Extract the json response. Rejects if the response is not 200
export const extractResponse = (response) => {
  if (response.status === 200) {
    return response.json()
  } else {
    return response.json()
    .then((error) => {
      return Promise.reject(
        new APIError({
          status     : response.status,
          statusText : response.statusText,
          error
        })
      )
    })
  }
}

// Parse an error and displays a suitible message to the user.
export const onError = (error) => {
  // TODO : Display an error message to the user
  console.error('There was an error', error)
  return false
}

// ------------------------------------
// Actions
// ------------------------------------
/**
 * Post a poll through the api, fetches the poll and answer from the selectors
 *
 * @return {Function} redux-thunk callable function
 */
export const postPoll = () => (dispatch, getState) =>
  fetch(ROUTE_POLL, {
    credentials : 'same-origin',
    method      : 'POST',
    body        : JSON.stringify({
      question : questionSelector(getState()),
      answers  : answersSelector(getState())
    })
  })
  .then(extractResponse)
  .then((response) => dispatch(updatePoll(response)))
  .catch(onError)

/**
 * Fetches a poll with the identifier from the api
 *
 * @param  {string} identifier The identifier for the poll
 *
 * @return {Function} redux-thunk callable function
 */
export const fetchPoll = (identifier) => (dispatch, getState) =>
  fetch(ROUTE_POLL + '/' + identifier, {
    credentials : 'same-origin'
  })
  .then(extractResponse)
  .then((response) => dispatch(updatePoll(response)))
  .catch(onError)

/**
 * Fetches a poll with the identifier from the api
 *
 * @param  {integer} answer     The id of the answer to submit
 * @param  {string}  identifier The identifier for the poll
 *
 * @return {Function} redux-thunk callable function
 */
export const postResponse = (answer, identifier) => (dispatch, getState) =>
  fetch(ROUTE_POLL + '/' + identifier + ROUTE_RESPONSES, {
    credentials : 'same-origin',
    method      : 'POST',
    body        : JSON.stringify({
      answers : [answer]
    })
  })
  .then(extractResponse)
  .then((response) => dispatch(updateResponses(response, identifier)))
  .catch(onError)

/**
 * Fetches the responses for a poll
 *
 * @param  {string} identifier The identifier for the poll
 *
 * @return {Function} redux-thunk callable function
 */
export const fetchResponses = (identifier) => (dispatch, getState) =>
  fetch(ROUTE_POLL + '/' + identifier + ROUTE_RESPONSES, {
    credentials : 'same-origin'
  })
  .then(extractResponse)
  .then((response) => dispatch(updateResponses(response, identifier)))
  .catch(onError)