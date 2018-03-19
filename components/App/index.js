import React from 'react';
import Router from 'next/router'

import Set from '../Set';
import Item from '../Item';
import FindingAids from '../FindingAids';

class App extends React.Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     onLoadApp: props.onLoadApp,
  //   }
  //   this.rebuildData = this.rebuildData.bind(this);
  // }

  // componentDidMount() {
  //   this.rebuildData(this.props.router);
  // }

  // componentWillReceiveProps(nextProps) {
  //   Router.onRouteChangeStart = url => {
  //     console.log(url);
  //     this.rebuildData(nextProps);
  //   }
  // }

  

  // rebuildData(propData) {
  //   console.log('lkajdlkjad')
  //   if((propData.resultType == 'recordGroup') || (propData == false)) {
      
  //     this.state.onLoadApp('recordGroup', null)
  //     // this.setState((prevState, props) => {
  //     //   return {
  //     //     resultType: 'series'
  //     //   };
  //     // });
  //   } else if(propData.resultType == 'item') {
  //     this.state.onLoadApp('item', propData.router.series)
  //     // this.setState((prevState, props) => {
  //     //   return {
  //     //     resultType: 'item'
  //     //   };
  //     // });
  //   } else {
  //     //this.state.onLoadApp('recordGroup', null)
  //     // this.setState((prevState, props) => {
  //     //   return {
  //     //     resultType: 'recordGroup'
  //     //   };
  //     // });
  //   }
  // }
  static async getInitialProps() {
    const res = await fetch('https://api.github.com/repos/zeit/next.js')
    const json = await res.json()
    console.log(json)
    return { stars: json.startgazers_count };
  }

  render() {

    
    let dataItems;
    
    // if (!this.props.isFetching && this.props.data) {
    //   dataItems =  this.props.data.opaResponse.results.result.map((item, index) => {
    //     let thisItem;
    //     if (this.props.resultType === 'recordGroup') {
    //      thisItem = <Set
    //         key={index}
    //         open={false}
    //         resultType={this.props.resultType}
    //         setChildren={Number(item.description.recordGroup.seriesCount)}
    //         setNumber={Number(item.description.recordGroup.recordGroupNumber)}
    //         title={'foobar'}
    //       />
    //     } else if (this.props.resultType === 'series') {
    //       thisItem = <Set
    //           key={index}
    //           open={false}
    //           resultType={'series'}
    //           // setChildren={Number(item.description.series.itemCount)}
    //           // setNumber={Number(item.description.series.naId)}
    //           title={'blah'}
    //           // description={item.description.series.scopeAndContentNote}
    //         />
    //     } else {
    //       console.log('jdidj')
    //       thisItem = <Item
    //           key={index}
    //           online={false}
    //           resultType={'item'}
    //           title={'what what'}
    //           // description={item.description.series.scopeAndContentNote}
    //         />
    //     }
    //     return thisItem;
    //   });
    // }
    return (
      <div>
        <h1>Finding Aids</h1>
        {this.props.isFetching &&
          <h2>Searching...</h2>
        }
        {this.props.stars}
      </div>
    );
  }
}

export default App;
