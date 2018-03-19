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
        {/* <Link prefetch href={{ 
          pathname: '/record-group', 
          query: {[recordGroupNumber]: setNumber}
        }}><a>How about preact?</a></Link> */}
      </div>
    )
  }
} 