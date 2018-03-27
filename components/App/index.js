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
import Button from '../Button';
import YearScroll from '../YearScroll';

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
      filtered: props.filtered,
      filteredKeys: null,
      filterOpen: false,
      year: null
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleFilterSubmit = this.handleFilterSubmit.bind(this);
    this.openFilter = this.openFilter.bind(this);
    this.handleYearChange = this.handleYearChange.bind(this);
  }

  openFilter() {
    this.setState({filterOpen: !this.state.filterOpen})
  }

  handleYearChange(event) {
    event.preventDefault();
    this.setState({year: event.target.value})
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
    let filteredKeys;
    if(this.state.locationFilter) {
      console.log(this.state.locationFilter)
      const keys = Object.keys(this.state.locationFilter);
      filteredKeys = keys.filter((key) => {return this.state.locationFilter[key]}).join()
    } else {
      filteredKeys = null
    }

    const apiReq = getApiRequest({
      resultType: this.state.resultType,
      cursorMark: this.state.cursorMark,
      queryId: this.props.query,
      filtered: true,
      filterLocation: filteredKeys,
      cursorMark: '*'
    });

    fetch(apiReq)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if(data.opaResponse.results.total > 0) {
          this.setState({
            results: data.opaResponse.results.result,
            cursorMark: data.opaResponse.results.nextCursorMark,
            allResult: data.opaResponse,
            filterKeys: filteredKeys,
            filtered: true
          });
        } else {
          this.setState({
            noResults: true,
            results: null
          })
        }

      }
    );
  }

  handleClick(event) {
    let filteredKeys
    if(this.state.locationFilter) {
      const keys = Object.keys(this.state.locationFilter);
      filteredKeys = keys.filter((key) => {return this.state.locationFilter[key]}).join()
    } else {
      filteredKeys = {}
    }
    
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
        cursorMark: data.opaResponse.results.nextCursorMark,
        filtered: true,
        filterKeys: filteredKeys
      })
    );
  }

  render() {
    let setChildren;
    let setNumber;
    let componentTitle;
    let mappedResults;
    let moreButton;
    if(this.state.results) {
      mappedResults = this.state.results.map((result, index) => {
        if(this.state.resultType === "recordGroup") {
          if(this.state.year && Number(result.description.recordGroup.inclusiveDates.inclusiveStartDate.year) > this.state.year) {
            <Set
                key={index}
                open={false}
                resultType={'recordGroup'}
                setChildren={Number(result.description.recordGroup.seriesCount)}
                setNumber={Number(result.description.recordGroup.recordGroupNumber)}
                title={result.description.recordGroup.title}
              />
          } else {
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
          }
        } else if(this.state.resultType === "series") {
          return (
            <Set
              key={index}
              open={false}
              resultType={'series'}
              setChildren={Number(result.description.series.itemCount)}
              setNumber={Number(result.description.series.naId)}
              title={result.description.series.title}
              description={result.description.series.scopeAndContentNote}
              physicalResult={result.description.series.physicalOccurrenceArray.seriesPhysicalOccurrence}
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
      })
    }
    if(this.state.cursorMark) {
      moreButton = <Button onClick={this.handleClick} text={'Load More'} />;
    }

    return (
      <div>
        <Head>
          <title>Finding Aids</title>
          <meta charSet='utf-8' />
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        </Head>
        <Header text={'Finding Aids: ' + this.state.pageTitle}/>
        <Breadcrumb 
            recordGroup={this.props.recordGroup}
            series={this.props.resultType == 'items' ? this.props.query : null}
            records={this.props.totalResults}
          />
          <YearScroll results={this.state.results} onchange={this.handleYearChange} year={this.state.year}/>
            {this.state.results &&
              <section>
                {mappedResults}
                {moreButton}
              </section>
            }
            {this.state.noResults &&
              <div>
                <p>No results found, please try with fewer filters.</p>
              </div>
            }
            
          <Button onClick={this.openFilter} text={this.state.filterOpen ? 'Hide Filter' : 'Show Filter'} />
          {this.state.filterOpen &&
            <FilterForm handleLocationChange={this.handleLocationChange} handleFilterSubmit={this.handleFilterSubmit}/>
          }

          <style jsx>{`
            section {
              display: flex;
              flex-direction: column;
              flex-wrap: wrap;
              height: 75vw;
            }
            `}</style>
      </div>
    );
  }
}

export default App;
