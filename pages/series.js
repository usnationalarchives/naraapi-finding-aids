import React from 'react';
import Link from 'next/link'

import 'isomorphic-unfetch'
import App from '../components/App';
import {getApiRequest} from '../components/getApiReq';

export default class Series extends React.Component {
  
  static async getInitialProps ({ pathname, query }) {
    
    // eslint-disable-next-line no-undef
    let apiReq = getApiRequest({resultType: 'item', queryId: query.id});
    const res = await fetch(apiReq)
    const json = await res.json()
    return { data: json.opaResponse.results, query: query.id }
  }

  render () {
    return (
      <App 
        pageTitle={this.props.data.result[0].description.item.parentSeries.title}
        recordGroup={this.props.data.result[0].description.item.parentSeries.parentRecordGroup.recordGroupNumber}
        resultType={'items'}
        data={this.props.data.result}
        cursorMark={this.props.data.nextCursorMark}
        totalResults={this.props.data.total}
        query={this.props.query}
        filtered={false}
      />
    )
  }
} 