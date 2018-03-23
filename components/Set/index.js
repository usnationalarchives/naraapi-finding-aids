import React from 'react';
import {Fragment} from 'react';
import Link from 'next/link'
import PropTypes from 'prop-types';

const SetImage = ({image, alt, onclick}) => {
  return(
    //onClick={this.toggleOpen}
    <Fragment>
      <img  src={image} alt={alt} onClick={onclick}/>
      <style jsx>{`
        img {
          width:300px;
        }
      `}</style>
    </Fragment>
  );
}

const SetInfo = ({recordType, recordNumber, childRecords}) => {
  return(
    //onClick={this.toggleOpen}
    <aside>
      {/* Record Group */}
      <span>Record Group {recordNumber}</span> | 
      {/* Series */}
      {recordType == 'recordGroup' ? 
        (<span> {childRecords} Record Groups</span>) :
        (<span> {childRecords} Series</span>)
      }
      <style jsx>{`
        aside {
          text-transform: uppercase;
          width: 300px;
        }
      `}</style>
    </aside>
  );
}

const SetTop = ({state, props, onclick}) => {
  return(
    <div>
      <SetImage image={state.image} alt={props.title} onclick={onclick}/>
      <div>
        <h2>{props.title}</h2>
        <p>{state.description}</p>
      </div>
    </div>
  );
}

const SetBottom = ({state, props}) => {
  let path_name;
  let query_key;

  if(props.resultType == 'recordGroup') {
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
          color: #0071bc;
        }
        .link:visited {
          color: #4c2c92;
        }
        .link:focus {
          outline: 2px dotted #aeb0b5;
          outline-offset: 3px;
        }
        .link:hover,
        .link:active {
          color: #205493;
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
      <SetInfo recordType={state.resultType} recordNumber={props.setNumber} childRecords={props.setChildren} />
      <Link 
          href={{ pathname: '/' + path_name, query: {id: props.setNumber}}}>
          <a className={`link ${scoped.className}`}>View {query_key}</a>
        </Link>
        {scoped.styles}
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
      description: 'Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Sed porttitor lectus nibh. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Pellentesque in ipsum id orci porta dapibus. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi.'
    }
    this.toggleOpen = this.toggleOpen.bind(this)
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
    .then(data => this.setState({image: data.opaResponse.results.result[0].objects ? data.opaResponse.results.result[0].objects.object.file['@url'] : '/static/placeholder.png'})
      
    );
  }

  toggleOpen() {
    this.setState({open: !this.state.open})
  }

  render() {
    return(
      <div>
        {!this.state.open &&
          <SetImage image={this.state.image} alt={this.props.title} onclick={() => this.toggleOpen()} />
        }
        {this.state.open &&
          <Fragment>
            <SetTop state={this.state} props={this.props} onclick={() => this.toggleOpen()} />
            <SetBottom state={this.state} props={this.props} />
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
            background: #f1f1f1;
            padding: 20px;
            max-width: 400px;
            display: inline-block;
            margin: 10px;
            width: 100%;
          }
          div:nth-child(3n) {
            background: #dce4ef;
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
