import React from 'react';
import {Fragment} from 'react';
import Link from 'next/link'
import PropTypes from 'prop-types';

class Set extends React.Component {

  constructor(props) {
    super(props);    
    this.state = {
      open: props.open,
      image: '/static/placeholder.png',
      resultType: props.resultType
    }
    
  }

  componentDidMount() {
    let api = 'https://catalog.archives.gov/api/v1?resultTypes=object&objects.object.file.@mime_is=image/jpeg&rows=1';
    if(this.state.resultType === 'recordGroup') {
      api += '&description.item.parentSeries.parentRecordGroup=' + this.props.setNumber;
    } else {
      api += '&description.item.parentSeries.naId=' + this.props.setNumber;
    }
    fetch(api)
    .then(response => response.json())
    .then(data => this.setState({image: data.opaResponse.results.result[0].objects.object.file['@url']})
      
    );
  }

  render() {
    let path_name;
  let query_key;

  if(this.props.resultType == 'recordGroup') {
    query_key = 'recordGroup';
    path_name = 'record-group';
  } else {
    query_key = 'series';
    path_name = 'series';
  }
    const scoped = resolveScopedStyles(
      <scope>
        <style jsx>{`
          .link:link {
            color:#0071bc;
          }
          .link:visited {
            color:#4c2c92;
          }
          .link:focus {
            outline:2px dotted #aeb0b5;
            outline-offset:3px;
          }
          .link:hover,
          .link:active {
            color:#205493;
          }
        `}</style>
      </scope>
    )
  
    function resolveScopedStyles(scope) {
      return {
        className: scope.props.className,
        styles: scope.props.children
      }
    }
    return(
      <div>
        <h2>{this.props.title}</h2>
        <img src={this.state.image} alt={this.props.title} />
        <Link 
          href={{ pathname: '/' + path_name, query: {id: this.props.setNumber}}}>
          <a className={`link ${scoped.className}`}>View {query_key}</a>
        </Link>
        <p>Number: {this.props.setNumber}</p>
        <p>Number of Children: {this.props.setChildren}</p>
        {scoped.styles}
        <style jsx>{`
          div {
            background:#f1f1f1;
            margin-bottom:20px;
            padding:20px;
          }
          div:nth-child(odd) {
            background:#dce4ef;
          }
          img {
            width: 300px;
          }
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
