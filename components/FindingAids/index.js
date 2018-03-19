import React from 'react';
import 'isomorphic-unfetch'


class FindingAids extends React.Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     dataItems: props.dataItems,
  //   }
  // }

  static async getInitialProps() {
    const res = await fetch('https://api.github.com/repos/zeit/next.js')
    const json = await res.json()
    console.log(json)
    return { stars: json.startgazers_count };
  }

  render() {
    return(
      <div>
        <p>hello world {this.props.stars}</p>
        
        {/* {this.state.dataItems.map((item, index) => {
          return item;
        })} */}
      </div>
    );
  }
}

export default FindingAids;