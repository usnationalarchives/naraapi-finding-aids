import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

// Should look like this:
// Home => doesn't show
// ?recordGroup => Record Group # | # of series (Record Group links to home)
// ?series => Record Group # | Series # | # of records (Record Group links to Record Group && Series links to series)


const Breadcrumb = ({recordGroup, series, totalResults, onClick}) => {
  let recordLabel = 'Records';
  let urlPath;
  let seriesLabel;
  let seriesPath;
  let recordCount;
  if(recordGroup && series === '') {
    urlPath = { pathname: '/'};
    seriesLabel = totalResults + ' Series';
  } else {
    urlPath = { pathname: '/record-group', query: {id: recordGroup}};
    seriesPath = { pathname: '/series', query: {id: series}};
    seriesLabel = 'Series #' + series;
    recordCount = totalResults + (totalResults > 1 ? ' Records' : ' Record');
  }


  const scoped = resolveScopedStyles(
    <scope>
      <style jsx>{`
        .link:link,
        .link:visited {
          text-transform: uppercase;
          padding-right: 10px;
          position: relative;
          text-decoration: none;
          padding-left: 10px;
          border-left: 2px solid #212121;
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
        .link:first-of-type {
          border-left: none;
          padding-left: 0;
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
        <Link 
          href={urlPath}>
          <a className={`link ${scoped.className}`}>Record Group {recordGroup}</a>
        </Link>
        {series ? 
          <Fragment>
            <Link 
              href={seriesPath}>
              <a className={`link ${scoped.className}`}>{seriesLabel}</a>
            </Link>
            <span>{recordCount}</span>
          </Fragment>
               :
          <span>{seriesLabel}</span>
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
        
      `}</style>
    </div>
  );
};

export default Breadcrumb;


// {(recordGroup && !series) &&
//   <span>Record Group {recordGroup} </span> 
// }
// {(recordGroup && series) &&

// }
// {series &&
//   <span>Series {series}</span> 
// }
// {recordGroup &&
//   <span>{records + ' ' + recordLabel}</span> 
// }