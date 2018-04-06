import React from 'react';
import {Fragment} from 'react';
import PropTypes from 'prop-types';

import {SetLeft, SetRight} from './SetLayout';
import SetImage from './SetImage';
import SetModal from './SetModal';
import Button from '../Button';


class Set extends React.Component {

  constructor(props) {
    super(props);    
    this.state = {
      open: props.open,
      image: '/static/nara-horizontal-logo.svg',
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
      image: data.opaResponse.results.result[0].objects ? data.opaResponse.results.result[0].objects.object.file['@url'] : '/static/nara-horizontal-logo.svg',
      isFetching: false
    })
      
    );
  }

  toggleOpen() {
    this.setState({open: !this.state.open})
  }
  
  render() {
    let visualSize = '225px';
    if(this.props.visualSize === 'small') {
      visualSize = '150px';
    } else if (this.props.visualSize === 'large') {
      visualSize = '300px';
    }

    const scoped = resolveScopedStyles(
      <scope>
        <style jsx>{`
          .modal {
            height: 100vh;
            width: 100vw;
            position: fixed;
            top: 0;
            left: 0;
            margin: 0;
            z-index: 15;
            background-color: rgba(50, 58, 69, .9);
          }
          .modal::before {
            display: block;
            width: 100%;
            height: 100%;
            content: "";
            opacity: 0.3;
            background-color: rgba(50, 58, 69, 1);
            backdrop-filter: blur(5px);
          }
          .inner-modal {
            height: 350px;
            width: 800px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
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
      <div tabIndex="0">
        <SetImage image={this.state.image} alt={this.props.title} onclick={() => this.toggleOpen()} isFetching={this.state.isFetching} size={visualSize} />
        {this.state.open &&
          <SetModal>
            <div className={`modal ${scoped.className}`}>
              <div className={`inner-modal ${scoped.className}`}>
                <Button
                  onClick={() => this.toggleOpen()}
                  text={'Close'}
                  type={'close'}
                  dark={false}
                />
                <SetLeft state={this.state} props={this.props} />
                <SetRight state={this.state} props={this.props} />
              </div>
            </div>
            {scoped.styles}
          </SetModal>
        }
        <style jsx>{`
          h2 {
            font-weight: 700;
            font-size: 20px;
            line-height: 35px;
            margin: 0 0 20px;
          }
          div {
            box-shadow: 1px 2px 12px -4px rgba(0,0,0,0.75);
            display: block;
            display: flex;
            background-color: #ffffff;
            flex-direction: row;
            margin: 10px;
            overflow: hidden;
            position: relative;
            width: 300px;
            height: ${visualSize};
            cursor: pointer;
          }
          div:hover {
            box-shadow: none;
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
