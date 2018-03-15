import { connect } from 'react-redux';
import App from '../../components/App';

import {
  requestData
} from '../../actions/Browse';

const mapStateToProps = (state, router) => {
  return {
    data: state.findingAidsData.appData,
    isFetching: state.findingAidsData.isFetching,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadApp: (dataType, id) => {
      dispatch(requestData(dataType, id))
    }
  };
};

const FindingAids = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default FindingAids;
