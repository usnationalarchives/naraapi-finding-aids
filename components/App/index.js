import React from 'react';
import Router from 'next/router'

import Header from '../Header';
import Set from '../Set';
import Item from '../Item';
import FindingAids from '../FindingAids';
import Breadcrumb from '../Breadcrumb';

import FilterForm from '../FilterForm';
import SearchForm from '../SearchForm';
import {getApiRequest} from '../getApiReq';

import Head from 'next/head';

class App extends React.Component {
  // If all open items need to close when one is open, need to lift the toggleOpen function to App.
  constructor(props) {
    super(props);
    this.state = {
      pageTitle: props.pageTitle,
      resultType: props.resultType,
      results: props.data,
      currentResults: props.currentResults,
      cursorMark: props.cursorMark,
      offset: props.offset,
      filtered: props.filtered
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleFilterSubmit = this.handleFilterSubmit.bind(this);
  }

  handleLocationChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    let locationFilter = {...this.state.locationFilter}
    locationFilter[name] = value;
    this.setState({locationFilter});
  }

  handleFilterSubmit(event) {
    event.preventDefault();
    
    const keys = Object.keys(this.state.locationFilter);
    const filteredKeys = keys.filter((key) => {return this.state.locationFilter[key]}).join()

    const apiReq = getApiRequest({
      resultType: this.state.resultType,
      cursorMark: this.state.cursorMark,
      queryId: this.props.query,
      filtered: true,
      filterLocation: filteredKeys
    });

    fetch(apiReq)
      .then(response => response.json())
      .then(data => this.setState({
        results: data.opaResponse.results.result,
        cursorMark: data.opaResponse.results.nextCursorMark,
        allResult: data.opaResponse,
        filterKeys: filteredKeys,
        filtered: true
      })
    );
  }

  handleClick(event) {
    //add check to see if nextCursorMark is undefined or we ran out of pages
    const apiReq = getApiRequest({
      resultType: this.state.resultType,
      cursorMark: this.state.cursorMark,
      queryId: this.props.query,
      filtered: true,
      filterLocation: filteredKeys
    });
    
    fetch(apiReq)
      .then(response => response.json())
      .then(data => this.setState({
        results: this.state.results.concat(data.opaResponse.results.result),
        cursorMark: data.opaResponse.results.nextCursorMark
      })
    );
  }

  render() {
    let setChildren;
    let setNumber;
    let componentTitle;
    return (
      <div>
        <Head>
          <title>Finding Aids</title>
          <meta charSet='utf-8' />
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        </Head>
        <Header text={'Finding Aids: ' + this.state.pageTitle}/>
        <Breadcrumb 
            recordGroup={this.props.query}
            series={null}
            records={this.props.totalResults}
          />
          <section>
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
          </section>
          <button onClick={this.handleClick}>Load More</button>
          <FilterForm handleLocationChange={this.handleLocationChange} handleFilterSubmit={this.handleFilterSubmit}/>
          <SearchForm />
          <style jsx>{`
            section {
              display: flex;
              flex-direction: column;
              flex-wrap: wrap;
              height: 75vw;
            }

            button {
              background: #0071bc;
              border: 0;
              border-radius: 5px;
              color: #ffffff;
              cursor: pointer;
              font-size: 14px;
              font-weight: 700;
              padding: 10px 20px;
            }
            button:hover {
              background: #205493;
            }
            button:active {
              background: #112e51;
            }
            button:focus {
              outline: 2px dotted #aeb0b5;
              outline-offset: 3px;
            }
            
            `}</style>
      </div>
    );
  }
}

export default App;
