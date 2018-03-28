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
    let visualSize = '350px';
    if(this.props.visualSize === 'small') {
      visualSize = '200px';
    } else if (this.props.visualSize === 'large') {
      visualSize = '500px';
    }
    return(
      <div tabindex="0">
        {!this.state.open &&
          
          <SetImage image={this.state.image} alt={this.props.title} onclick={() => this.toggleOpen()} isFetching={this.state.isFetching} size={visualSize} />
        }
        {this.state.open &&
          <Fragment>
            <SetLeft state={this.state} props={this.props} visualSize={'400px'} />
            <SetRight state={this.state} props={this.props} onclick={() => this.toggleOpen()}/>
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
            margin: 5px;
            overflow: hidden;
            position: relative;
          }
          div:hover,
          div:focus {
            box-shadow: 0 0 10px #d6d7d9;
          }
        `}</style>
        <style jsx>{`
          width: ${this.state.open ? 800 + 'px' : 400 + 'px'};
          height: ${this.state.open ? 400 + 'px' : visualSize};
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
