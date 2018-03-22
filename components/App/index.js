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
      cursorMark: props.cursorMark,
      offset: props.offset
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    let api = 'https://catalog.archives.gov/api/v1?';
    if(this.state.resultType === 'recordGroup') {
      api += 'resultTypes=recordGroup&rows=50&cursorMark=' + this.state.cursorMark;
    } else {
      api += 'resultTypes=series&description.series.parentRecordGroup.recordGroupNumber='+ this.props.query + '&rows=50&cursorMark=' + this.state.cursorMark;
    }
    console.log(api)
    fetch(api)
    .then(response => response.json())
    .then(data => this.setState({results: this.state.results.concat(data.opaResponse.results.result), cursorMark: data.opaResponse.results.nextCursorMark})
      
    );
  }

  render() {
    let setChildren;
    let setNumber;
    let componentTitle;
    return (
      <div>
        <Header text={'Finding Aids: ' + this.state.pageTitle}/>
        <div>
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
          <button onClick={this.handleClick}>Load More</button>
          <style jsx>{`
            div div {
              display: flex;
              flex-direction: column;
              flex-wrap: wrap;
              padding: 10px;
              height: 1000px;
            }
            `}</style>
      </div>
    );
  }
}

export default App;
