import React from 'react';

import RecordGroup from '../RecordGroup';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  componentDidMount() {
    this.props.onLoadApp();
  }

  render() {
    let recordGroupItems;
    if (!this.props.isFetching && this.props.data) {
      recordGroupItems =  this.props.data.opaResponse.results.result.map((item, index) =>
        <RecordGroup data={item} key={item.naId} />
      );
      console.log(recordGroupItems);
    }

    return (
      <div>
        <h1>Finding Aids</h1>
        {recordGroupItems}
      </div>
    );
  }
}

export default App;
