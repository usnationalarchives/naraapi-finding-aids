import React from 'react';
import Router from 'next/router'

import Header from '../Header';
import Set from '../Set';
import Item from '../Item';
import FindingAids from '../FindingAids';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pageTitle: props.pageTitle,
      resultType: props.resultType,
      results: props.data,
      currentResults: props.currentResults,
    }
  }

  render() {
    let setChildren;
    let setNumber;
    let componentTitle;
    return (
      <div>
        <Header text={'Finding Aids: ' + this.state.pageTitle}/>
          {this.state.results.map((result, index) => {
            if(this.state.resultType === "recordGroup") {
              return (
                <Set
                  key={index}
                  open={false}
                  resultType={'recordGroup'}
                  setChildren={Number(result.description.recordGroup.seriesCount)}
                  setNumber={Number(result.description.recordGroup.recordGroupNumber)}
                  title={result.description.recordGroup.title}
                />
              )
            } else {
              return (
                <Set
                  key={index}
                  open={false}
                  resultType={'series'}
                  setChildren={Number(result.description.series.itemCount)}
                  setNumber={Number(result.description.series.naId)}
                  title={result.description.series.title}
                />
              )
            }
          })}
      </div>
    );
  }
}

export default App;
