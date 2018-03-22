import React from 'react';
import Link from 'next/link'

import 'isomorphic-unfetch'
import App from '../components/App';

export default class Series extends React.Component {
  
  static async getInitialProps ({ pathname, query }) {
    
    // eslint-disable-next-line no-undef
    const res = await fetch('https://catalog.archives.gov/api/v1?resultTypes=item&description.item.parentSeries.naId_is='+ query.id  + '&rows=50&cursorMark=*')
    const json = await res.json()
    return { data: json.opaResponse.results, query: query.id }
  }

  render () {
    return (
      <App 
        pageTitle={this.props.data.result[0].description.item.parentSeries.title}
        resultType={'items'}
        data={this.props.data.result}
        cursorMark={this.props.data.nextCursorMark}
        totalResults={this.props.data.total}
        query={this.props.query}
      />
    )
  }
} 