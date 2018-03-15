import React from 'react';

import Set from '../Set';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  componentDidMount() {
    if('series' in this.props.router) {
      this.props.onLoadApp('series', this.props.router.series);
    } else {
      this.props.onLoadApp('recordGroup', null);
    }
  }

  render() {
    let recordGroupItems;
    if (!this.props.isFetching && this.props.data && ('series' in this.props.router)) {
      // recordGroupItems =  this.props.data.opaResponse.results.result.map((item, index) =>
      //   <RecordGroup data={item} key={item.naId} />
      // );
    }

    return (
      <div>
        <h1>Finding Aids</h1>
        {this.props.isFetching &&
          <h2>Blah</h2>
        }
        <Set
          open={false}
          resultType={'series'}
          setChildren={20}
          setNumber={75}
          title={"Set Title"}
        />
      </div>
    );
  }
}

export default App;
