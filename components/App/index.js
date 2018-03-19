import React from 'react';
import Router from 'next/router'

import Set from '../Set';
import Item from '../Item';
import FindingAids from '../FindingAids';

class App extends React.Component {

  render() {

    
    let dataItems;

    return (
      <div>
        <h1>Finding Aids</h1>
        {this.props.isFetching &&
          <h2>Searching...</h2>
        }
        {(!this.props.isFetching && this.props.data) &&
          dataItems
        }
        <style jsx global>{`
          @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,600,700');
          @import url('https://fonts.googleapis.com/css?family=Merriweather');
          html {
            font-size:10px;
          }
          body {
            background-color:#fff;
            font-size:16px;
            font-family:"Source Sans Pro", sans-serif;
            text-align:left;
            margin:15px;
          }
          h1 {
            color:#205493;
            font-family:"Merriweather", serif;
            font-weight:700;
            font-size:40px;
            line-height:52px;
          }
          h2 {
            font-family:"Merriweather", serif;
            font-weight:700;
            font-size:30px;
            line-height:39px;
            margin: 0 0 20px;
          }
          h3 {
            font-family: "Merriweather", serif;
            font-weight:700;
            font-size:20px;
            line-height:26px;
          }
          h4 {
            font-family:"Merriweather", serif;
            font-weight:700;
            font-size:17px;
            line-height:22px;
          }
          
        `}</style>
      </div>
    );
  }
}

export default App;
