import React from 'react';
import Link from 'next/link'

import 'isomorphic-unfetch'


import Item from '../components/Item';
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

export default class Series extends React.Component {
  
  static async getInitialProps ({ pathname, query }) {
    
    // eslint-disable-next-line no-undef
    const res = await fetch('https://catalog.archives.gov/api/v1?resultTypes=item&description.item.parentSeries.naId_is='+ query.id)
    const json = await res.json()
    console.log(res)
    return { data: json.opaResponse.results.result }
  }

  render () {
    return (
      <div>
        {this.props.data.map((result, index) => 
          <Item
            key={index}
            open={false}
            resultType={'item'}
            title={result.description.item.title}
          />
        )}
        <p>seiuhiuhw</p>
      </div>
    )
  }
} 