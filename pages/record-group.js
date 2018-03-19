import React from 'react';
import Link from 'next/link'

import 'isomorphic-unfetch'


import Set from '../components/Set';
//import ReactDOM from 'react-dom';
//import { Provider } from 'react-redux';

//import configureStore from '../reducers/configureStore';
//export const store = configureStore();

//import FindingAidsContainer from '../containers/FindingAidsContainer';


// const Index = ({url}) => (
//   <Provider store={store}>
//     <FindingAidsContainer router={url.query}/>
//   </Provider>
// );

// export default Index;

export default class RecordGroup extends React.Component {
  
  static async getInitialProps ({ pathname, query }) {
    console.log(query)
    // eslint-disable-next-line no-undef
    const res = await fetch('https://catalog.archives.gov/api/v1?resultTypes=series&description.series.parentRecordGroup.recordGroupNumber='+ query.id + '&rows=10000')
    const json = await res.json()
    return { data: json.opaResponse.results.result }
  }

  render () {
    return (
      <div>
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
        <p>eijfowefij</p>
      </div>
    )
  }
} 