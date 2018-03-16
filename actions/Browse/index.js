import fetch from 'cross-fetch';

export const REQUEST_DATA = 'REQUEST_DATA';
export const IS_FETCHING = 'IS_FETCHING';
export const BUILD_APP = 'BUILD_APP';

export function requestData(dataType, id) {
  return dispatch => {
    dispatch(getDataFromApi(dataType, id));
  }
}

function getDataFromApi(dataType, id) {
  // After the first, each new request addition must start with &
  let apiRequest = 'https://catalog.archives.gov/api/v1';

  if (dataType == 'recordGroup') {
    apiRequest += '?resultTypes=' + dataType;
  }

  if(dataType == 'series') {
    apiRequest += '?resultTypes=series&description.series.parentRecordGroup.recordGroupNumber=' + id;
  }

  apiRequest += '&rows=10000';
  console.log(apiRequest);
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
