import fetch from 'cross-fetch';

export const REQUEST_DATA = 'REQUEST_DATA';
export const IS_FETCHING = 'IS_FETCHING';
export const BUILD_APP = 'BUILD_APP';

export function requestData() {
  return dispatch => {
    dispatch(getDataFromApi());
  }
}

function getDataFromApi() {
  let apiRequest = 'https://catalog.archives.gov/api/v1';
  apiRequest += '?resultTypes=recordGroup&rows=10000';

  return dispatch => {
    dispatch(isFetching());
    return fetch(apiRequest)
      .then(response => response.json())
      .then(json => dispatch(buildApp(json)))
  }
}

function buildApp(data) {
  return {
    type: BUILD_APP,
    appData: data,
    recievedAt: Date.now(),
    isFetching: false
  }
}

function isFetching() {
  return {
    type: IS_FETCHING,
    isFetching: true
  }
}
