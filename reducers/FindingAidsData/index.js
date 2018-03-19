import {
  REQUEST_DATA,
  IS_FETCHING,
  BUILD_APP
} from '../../actions/Browse';

const intialState = {
  isFetching: false,
  appData: null
};

function findingAidsData(state = intialState, action) {
  switch (action.type) {
    case IS_FETCHING: 
      return {
        ...state,
        isFetching: action.isFetching
      }
    case BUILD_APP:
      return {
        ...state,
        appData: action.appData,
        recievedAt: action.recievedAt,
        isFetching: action.isFetching,
        resultType: action.resultType
      }
    default:
      return state;
  }
}

export default findingAidsData;
