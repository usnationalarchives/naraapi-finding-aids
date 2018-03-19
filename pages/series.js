import React from 'react';
import Link from 'next/link'

import 'isomorphic-unfetch'

import Header from '../components/Header';
import Item from '../components/Item';

export default class Series extends React.Component {
  
  static async getInitialProps ({ pathname, query }) {
    
    // eslint-disable-next-line no-undef
    const res = await fetch('https://catalog.archives.gov/api/v1?resultTypes=item&description.item.parentSeries.naId_is='+ query.id)
    const json = await res.json()
    return { data: json.opaResponse.results.result }
  }

  render () {
    return (
      <div>
        <Header text={'Finding Aids: ' + this.props.data[0].description.item.parentSeries.title}/>
        {this.props.data.map((result, index) => {
          let imgUrl = '';

          if (result.objects) {
            if (Array.isArray(result.objects.object)) {
              imgUrl = result.objects.object[0].file['@url'];
            } else {
              imgUrl = result.objects.object.file['@url'];
            }
          }
          return(
            <Item
              key={index}
              open={false}
              resultType={'item'}
              image={imgUrl}
              description={result.description.item.scopeAndContentNote}
              title={result.description.item.title}
              naid={result.description.item.naId}
            />
          );
        }
          
        )}
      </div>
    )
  }
} 