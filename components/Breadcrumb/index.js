import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const Breadcrumb = ({recordGroup, series, records}) => {
  let recordLabel = 'Records';
  const scoped = resolveScopedStyles(
    <scope>
      <style jsx>{`
        .link:link,
        .link:visited {
          text-transform: uppercase;
          padding-right: 10px;
          position: relative;
          text-decoration: none;
        }
        
        .link:focus {
          outline: 2px dotted #aeb0b5;
          outline-offset: 3px;
        }
        .link:hover,
        .link:active {
          color: #fad980;
          text-decoration: underline;
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
  if (!series) {
    recordLabel = 'Series';
  }
  return(
    <div>
      {(recordGroup && !series) &&
        <span>Record Group {recordGroup} </span> 
      }
      {(recordGroup && series) &&
        <Link 
          href={{ pathname: '/record-group', query: {id: recordGroup}}}>
          <a className={`link ${scoped.className}`}>Record Group {recordGroup}</a>
        </Link>
      }
      {series &&
        <span>Series {series}</span> 
      }
      {recordGroup &&
        <span>{records + ' ' + recordLabel}</span> 
      }
      {scoped.styles}
      <style jsx>{`
        span {
          color: #212121;
          text-transform: uppercase;
          padding-left: 10px;
          position: relative;
          border-left: 2px solid #212121;
          margin-right: 10px;
        }
        span:first-of-type {
          border-left: ${recordGroup && !series ? 'none' : '2px solid #212121'};
        }
      `}</style>
    </div>
  );
};

export default Breadcrumb;
