import React from 'react';
import Link from 'next/link';

import 'isomorphic-unfetch';
import App from '../components/App';

export default class Index extends React.Component {
  static async getInitialProps () {
    // eslint-disable-next-line no-undef
    const res = await fetch('https://catalog.archives.gov/api/v1?resultTypes=recordGroup&rows=50&cursorMark=*')
    const json = await res.json()

    return { data: json.opaResponse.results}
  }
  
  render () {
    let resultsArray = [];
    for(let i = 0; i < this.props.data.length; i++) {
      resultsArray.push(this.props.data.result.result[i].description.recordGroup.recordGroupNumber)
    }
    return (
      <App 
        pageTitle={'All Record Groups'}
        resultType={'recordGroup'}
        data={this.props.data.result}
        currentResults={resultsArray}
        cursorMark={this.props.data.nextCursorMark}
        totalResults={this.props.data.total}
      />
    )
  }
} 


// <div>
//         
//         <FilterForm />
//         {this.props.data.map((result, index) => 

//         )}
//       </div>