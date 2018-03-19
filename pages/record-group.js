import React from 'react';
import Link from 'next/link'

import 'isomorphic-unfetch'

import Header from '../components/Header';
import Set from '../components/Set';

export default class RecordGroup extends React.Component {
  
  static async getInitialProps ({ pathname, query }) {
    // eslint-disable-next-line no-undef
    const res = await fetch('https://catalog.archives.gov/api/v1?resultTypes=series&description.series.parentRecordGroup.recordGroupNumber='+ query.id + '&rows=100')
    const json = await res.json();
    // Return Number of Results to display in header.
    return { data: json.opaResponse.results.result }
  }

  render () {
    return (
      <div>
        <Header text={'Finding Aids: ' + this.props.data[0].description.series.parentRecordGroup.title}/>
        {this.props.data.map((result, index) => 
          <Set
            key={index}
            open={false}
            resultType={'series'}
            setChildren={Number(result.description.series.itemCount)}
            setNumber={Number(result.description.series.naId)}
            title={result.description.series.title}
          />
        )}
      </div>
    )
  }
} 