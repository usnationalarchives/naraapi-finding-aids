import React from 'react';
import Link from 'next/link';

import 'isomorphic-unfetch';

import Header from '../components/Header';
import Set from '../components/Set';

export default class Index extends React.Component {
  static async getInitialProps () {
    // eslint-disable-next-line no-undef
    const res = await fetch('https://catalog.archives.gov/api/v1?resultTypes=recordGroup&rows=10000')
    const json = await res.json()

    return { data: json.opaResponse.results.result }
  }

  render () {
    console.log(this.props.data)
    return (
      <div>
        <Header text={'Finding Aids: All Record Groups'}/>
        {this.props.data.map((result, index) => 
          <Set
            key={index}
            open={false}
            resultType={'recordGroup'}
            setChildren={Number(result.description.recordGroup.seriesCount)}
            setNumber={Number(result.description.recordGroup.recordGroupNumber)}
            title={result.description.recordGroup.title}
          />
        )}
      </div>
    )
  }
} 