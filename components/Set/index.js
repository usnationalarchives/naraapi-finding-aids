import React from 'react';
import {Fragment} from 'react';
import Link from 'next/link'
import PropTypes from 'prop-types';

const SetImage = ({image, alt, onclick, isFetching}) => {
  return(
    //onClick={this.toggleOpen}
    <div>
      {!isFetching &&
        <img  src={image} alt={alt} onClick={onclick}/>
      }
      <style jsx>{`
        img {
          width:300px;
          min-width:300px;
          height:300px;
        }
      `}</style>
      <style jsx>{`
        div {
          width:300px;
          min-width:300px;
          height:300px;
          animation-duration: 2s;
          animation-fill-mode: forwards;
          animation-iteration-count: infinite;
          animation-name: shimmerBackground;
          animation-timing-function: linear;
          background: #f6f7f8;
          background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
          background-size: 800px 104px;
          position: relative;
        }
        @keyframes shimmerBackground {
          0%{
            background-position: -468px 0
        }
        100%{
            background-position: 468px 0
        }
      }
      `}</style>
    </div>
  );
}

const SetInfo = ({recordType, recordNumber, childRecords, isOpen}) => {
  return(
    //onClick={this.toggleOpen}
    <aside>
      {recordType == 'recordGroup' ? 
        (<span> Record Group {recordNumber} </span>) :
        (<span> Series {recordNumber} </span>)
      }
      |
      {recordType == 'recordGroup' ? 
        (<span> {childRecords} Series</span>) :
        (<span> {childRecords} Items</span>)
      }
      <style jsx>{`
        aside {
          text-transform: uppercase;
          letter-spacing: 1px;
          width: 300px;
          padding: 10px 0;
        }
      `}</style>
      <style jsx>{`
        aside {
          color: ${isOpen ? '#ffffff' : '#212121'}
        }
      `}</style>
    </aside>
  );
}

const SetLeft = ({state, props, onclick}) => {
  return(
    <div>
      <SetImage image={state.image} alt={props.title} onclick={onclick}/>
      <SetInfo recordType={state.resultType} recordNumber={props.setNumber} childRecords={props.setChildren} isOpen={state.open}/>
      <style jsx>{`
        div {
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </div>
  );
}

const SetRight = ({state, props}) => {
  let path_name;
  let linkLabel;

  if(props.resultType == 'recordGroup') {
    linkLabel = 'Record Group';
    path_name = 'record-group';
  } else {
    linkLabel = 'Series';
    path_name = 'series';
  }
  const scoped = resolveScopedStyles(
    <scope>
      <style jsx>{`
        .link:link,
        .link:visited {
          color: #ffffff;
          font-weight: bold;
          text-decoration: none;
          position: relative;
          display: block;
          align-self:flex-start;
          padding-right: 15px;
        }
        .link:after {
          content: ">";
          position: absolute;
          right: 0;
          top: 0;
          transition: right .5s;
        }
        
        .link:focus {
          outline: 2px dotted #aeb0b5;
          outline-offset: 3px;
        }
        .link:hover,
        .link:active {
          color: #fad980;
        }

        .link:hover:after,
        .link:active:after {
          right: -5px;
          color: #fad980;
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
      <h2>{props.title}</h2>
      <p>{state.description}</p>
      <Link 
          href={{ pathname: '/' + path_name, query: {id: props.setNumber}}}>
          <a className={`link ${scoped.className}`}>View {linkLabel}</a>
        </Link>
        {scoped.styles}
        <style jsx>{`
          div {
            display: flex;
            flex-direction: column;
            padding: 5px 20px 10px;
          }
        `}</style>
        <style jsx>{`
        div {
          color: ${state.open ? '#ffffff' : '#212121'}
        }
      `}</style>
    </div>
  );
}



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
