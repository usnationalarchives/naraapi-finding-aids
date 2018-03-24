import React from 'react';
import Link from 'next/link';

import 'isomorphic-unfetch';
import App from '../components/App';
import {getApiRequest} from '../components/getApiReq';

export default class Index extends React.Component {
  static async getInitialProps () {
    // eslint-disable-next-line no-undef
    let apiReq = getApiRequest({resultType: 'recordGroup'});
    const res = await fetch(apiReq)
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
        filtered={false}
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