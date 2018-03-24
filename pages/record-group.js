import React from 'react';
import Link from 'next/link'

import 'isomorphic-unfetch'

import App from '../components/App';
import {getApiRequest} from '../components/getApiReq';

export default class RecordGroup extends React.Component {
  
  static async getInitialProps ({ pathname, query }) {
    // eslint-disable-next-line no-undef
    let apiReq = getApiRequest({resultType: 'series', queryId: query.id});
    const res = await fetch(apiReq)
    const json = await res.json();
    // Return Number of Results to display in header.
    return { data: json.opaResponse.results, query: query.id }
  }
  

  render () {
    let resultsArray = [];
    for(let i = 0; i < this.props.data.length; i++) {
      resultsArray.push(this.props.data[i].naId)
    }
    return (
      <App 
        pageTitle={this.props.data.result[0].description.series.parentRecordGroup.title}
        resultType={'series'}
        data={this.props.data.result}
        currentResults={resultsArray}
        cursorMark={this.props.data.nextCursorMark}
        totalResults={this.props.data.total}
        query={this.props.query}
        filtered={false}
      />
    )
  }
} 