import React from 'react';
import Link from 'next/link'

import SetImage from './SetImage';
import SetInfo from './SetInfo';
import Button from '../Button';

export const SetLeft = ({state, props, visualSize}) => {
  return(
    <div>
      <SetImage image={state.image} alt={props.title} visualSize={visualSize} />
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
      <Button onClick={onclick} text={'Close'}></Button>
      <h2>{props.title}</h2>
      <p>{props.description}</p>
        {props.setChildren > 0 &&
          <Link href={{ pathname: '/' + path_name, query: {id: props.setNumber}}}>
          <a className={`link ${scoped.className}`}>View {linkLabel}</a>
          </Link>
        }
        {props.setChildren == 0 &&
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