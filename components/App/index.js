import React from 'react';
import Router from 'next/router'

import Header from '../Header';
import Set from '../Set';
import Item from '../Item';
import FindingAids from '../FindingAids';
import Breadcrumb from '../Breadcrumb';

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
    //add check to see if nextCursorMark is undefined or we ran out of pages
    let api = 'https://catalog.archives.gov/api/v1?';
    if(this.state.resultType === 'recordGroup') {
      api += 'resultTypes=recordGroup&rows=50&cursorMark=' + this.state.cursorMark;
    } else {
      api += 'resultTypes=series&description.series.parentRecordGroup.recordGroupNumber='+ this.props.query + '&rows=50&cursorMark=' + this.state.cursorMark;
    }
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
        <Breadcrumb 
            recordGroup={this.props.query}
            series={null}
            records={this.props.totalResults}
          />
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
            } else if(this.state.resultType === "series") {
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
            } else {
              return (
                <Item
                  key={index}
                  object={result.objects ? result.objects : null}
                  open={false}
                  resultType={'item'}
                  description={result.description.item.scopeAndContentNote}
                  title={result.description.item.title}
                  naid={result.description.item.naId}
                  tag={result.description.item.generalRecordsTypeArray.generalRecordsType.termName}
                  date={result.description.item.productionDateArray? result.description.item.productionDateArray.proposableQualifiableDate.logicalDate : null}
                />
              )
            }
          })}
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
