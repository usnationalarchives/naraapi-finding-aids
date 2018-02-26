import { connect } from 'react-redux';
import App from '../../components/App';

import {
  requestData
} from '../../actions/Browse';

const mapStateToProps = state => {
  return {
    data: state.findingAidsData.appData,
    isFetching: state.findingAidsData.isFetching
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadApp: () => {
      dispatch(requestData())
    }
  };
};

const FindingAids = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default FindingAids;
