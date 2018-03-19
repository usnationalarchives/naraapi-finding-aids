import React from 'react';
import Router from 'next/router'

import Set from '../Set';
import Item from '../Item';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      onLoadApp: props.onLoadApp
    }
    this.rebuildData = this.rebuildData.bind(this);
  }

  componentDidMount() {
    this.rebuildData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    Router.onRouteChangeStart = url => {
      this.rebuildData(nextProps);
    }
  }

  

  rebuildData(nextProps) {
    
    if('recordGroup' in nextProps.router) {
      this.state.onLoadApp('series', nextProps.router.recordGroup)
      this.setState((prevState, props) => {
        return {
          resultType: 'series'
        };
      });
    } else if('series' in nextProps.router) {
      this.state.onLoadApp('item', nextProps.router.series)
      this.setState((prevState, props) => {
        return {
          resultType: 'item'
        };
      });
    } else {
      this.state.onLoadApp('recordGroup', null)
      this.setState((prevState, props) => {
        return {
          resultType: 'recordGroup'
        };
      });
    }
  }


  render() {

    
    let dataItems;
    
    if (!this.props.isFetching && this.props.data) {
      dataItems =  this.props.data.opaResponse.results.result.map((item, index) => {
        let thisItem;
        if (this.state.resultType === 'recordGroup') {
         thisItem = <Set
            key={item.naId}
            open={false}
            resultType={this.state.resultType}
            setChildren={Number(item.description.recordGroup.seriesCount)}
            setNumber={Number(item.description.recordGroup.recordGroupNumber)}
            title={item.description.recordGroup.title}
          />
        } else if (this.state.resultType === 'series') {
          thisItem = <Set
              key={item.naId}
              open={false}
              resultType={this.state.resultType}
              setChildren={Number(item.description.series.itemCount)}
              setNumber={Number(item.description.series.naId)}
              title={item.description.series.title}
              description={item.description.series.scopeAndContentNote}
            />
        } else {
          thisItem = <Item
              key={item.naId}
              online={false}
              resultType={this.state.resultType}
              title={item.description.series.title}
              description={item.description.series.scopeAndContentNote}
            />
        }
        return thisItem;
      });
    }
    
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
          a:link {
            color:#0071bc;
          }
          a:visited {
            color:#4c2c92;
          }
          a:focus {
            outline:2px dotted #aeb0b5;
            outline-offset:3px;
          }
          a:hover,
          a:active {
            color:#205493;
          }
        `}</style>
      </div>
    );
  }
}

export default App;
