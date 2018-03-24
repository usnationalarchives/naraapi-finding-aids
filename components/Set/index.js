import React from 'react';
import {Fragment} from 'react';
import PropTypes from 'prop-types';

import {SetLeft, SetRight} from './SetLayout';
import SetImage from './SetImage';

class Set extends React.Component {

  constructor(props) {
    super(props);    
    this.state = {
      open: props.open,
      image: '/static/placeholder.png',
      resultType: props.resultType,
      description: '',
      isFetching: true
    }
    this.toggleOpen = this.toggleOpen.bind(this)
  }

  componentDidMount() {
    // Set an isfetching state during the call so the user knows something is happening
    let api = 'https://catalog.archives.gov/api/v1?resultTypes=object&objects.object.file.@mime_is=image/jpeg&rows=1';
    if(this.state.resultType === 'recordGroup') {
      api += '&description.item.parentSeries.parentRecordGroup=' + this.props.setNumber;
    } else {
      api += '&description.item.parentSeries.naId=' + this.props.setNumber;
    }
    fetch(api)
    .then(response => response.json())
    .then(data => this.setState({
      image: data.opaResponse.results.result[0].objects ? data.opaResponse.results.result[0].objects.object.file['@url'] : '/static/placeholder.png',
      isFetching: false
    })
      
    );
  }

  toggleOpen() {
    this.setState({open: !this.state.open})
  }

  render() {
    return(
      <div>
        {!this.state.open &&
          <SetImage image={this.state.image} alt={this.props.title} onclick={() => this.toggleOpen()} isFetching={this.state.isFetching} />
        }
        {this.state.open &&
          <Fragment>
            <SetLeft state={this.state} props={this.props} onclick={() => this.toggleOpen()} />
            <SetRight state={this.state} props={this.props} />
          </Fragment>
        }
        <style jsx>{`
          @import url('https://fonts.googleapis.com/css?family=Merriweather');
          h2 {
            font-family: "Merriweather", serif;
            font-weight: 700;
            font-size: 20px;
            line-height: 35px;
            margin: 0 0 20px;
          }
          div {
            padding: 20px;
            display: block;
            display: flex;
            flex-direction: row;
            margin: 10px;
          }
        `}</style>
        <style jsx>{`
          max-width: ${this.state.open ? 800 + 'px' : 400 + 'px'};
          background: ${this.state.open ? '#494440' : '#e4e2e0'};
        `}</style>
      </div>
    )
  }
}

Set.propTypes = {
  description: PropTypes.string,
  open: PropTypes.bool.isRequired,
  resultType: PropTypes.oneOf(['recordGroup', 'series']).isRequired,
  setChildren: PropTypes.number.isRequired,
  setNumber: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
}

export default Set;
