import React from 'react';
import Link from 'next/link'

import 'isomorphic-unfetch'

import App from '../components/App';

export default class RecordGroup extends React.Component {
  
  static async getInitialProps ({ pathname, query }) {
    // eslint-disable-next-line no-undef
    const res = await fetch('https://catalog.archives.gov/api/v1?resultTypes=series&description.series.parentRecordGroup.recordGroupNumber='+ query.id + '&rows=10')
    const json = await res.json();
    // Return Number of Results to display in header.
    return { data: json.opaResponse.results.result }
  }
  

  render () {
    let resultsArray = [];
    for(let i = 0; i < this.props.data.length; i++) {
      resultsArray.push(this.props.data[i].naId)
    }
    return (
      <App 
        pageTitle={this.props.data[0].description.series.parentRecordGroup.title}
        resultType={'series'}
        data={this.props.data}
        currentResults={resultsArray}
      />
    )
  }
} 