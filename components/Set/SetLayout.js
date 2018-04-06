import React from 'react';
import Link from 'next/link'

import SetImage from './SetImage';
import SetInfo from './SetInfo';

export const SetLeft = ({state, props}) => {
  let bgImage = state.image;
  if(state.image === '/static/nara-horizontal-logo.svg') {
    bgImage = '/static/us-national-archives.svg';
  }
  return(
    <div>
      <style jsx>{`
        div {
          display: block;
          max-width: 400px;
          width: 400px;
          height: 100%;
          background: ${'url(' +bgImage + ') no-repeat top center'};
          background-size: cover;
        }
      `}</style>
    </div>
  );
}

export const SetRight = ({state, props, onclick}) => {
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
          background-color: #112e51;
          padding: 10px 40px;
          margin: 20px 0;
          border-radius: 2.5rem;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 1px;
          text-decoration: none;
          position: relative;
          display: block;
          align-self:flex-start;
          box-shadow: 1px 2px 12px -4px rgba(0,0,0,0.75);
        }
        .link:after {
          content: "";
          display: inline-block;
          width: 8px;
          height: 8px;
          border: 2px solid #ffffff;
          border-left: 0;
          border-top: 0;
          transform: rotate(-45deg);
          position: absolute;
          right: 25px;
          top: 15px;
          transition: right .5s;
        }
        
        .link:focus {
          outline: 2px dotted #aeb0b5;
          outline-offset: 3px;
        }
        .link:hover,
        .link:active {
          color: #112e51;
          background-color: #ffffff;
        }

        .link:hover:after,
        .link:active:after {
          right: 20px;
          border-color: #112e51;
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
      <SetInfo recordType={state.resultType} recordNumber={props.setNumber} childRecords={props.setChildren} isOpen={state.open}/>
      <h2>{props.title}</h2>
      {props.description &&
        <p>{props.description}</p>
      }
      {props.setChildren > 0 &&
        <Link href={{ pathname: '/' + path_name, query: {id: props.setNumber}}}>
          <a className={`link ${scoped.className}`}>View {linkLabel}</a>
        </Link>
      }
      {(props.setChildren == 0 && props.physicalResult)&& //add checks for all these as they aren't always available
        <ul>
          <li><span>Size: </span>{props.physicalResult.extent}</li>
          <li><span>Holding Type: </span>{props.physicalResult.holdingsMeasurementArray.holdingsMeasurement.type.termName}</li>
          <li><span>Count: </span>{props.physicalResult.holdingsMeasurementArray.holdingsMeasurement.count}</li>
        </ul>
      }
      {scoped.styles}
      <style jsx>{`
        div {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          padding: 50px 40px 10px;
          color: #112e51;
          width: 400px;
        }
        h2 {
          font-weight: 700;
          margin: 0;
          margin-bottom: ${props.setChildren > 0 ?  '0' : '115px'}
        }
        p {
          display: block;
          overflow-x: auto;
          width: 100%;
          height: 100px;
          padding: 0;
          margin-bottom: 15px;
        }
      `}</style>
    </div>
  );
}
