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
          border-right: 2px solid #212121;
          color: #212121;
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
          href={'/'}>
          <a className={`link ${scoped.className}`}>All</a>
        </Link>
        {!series &&
          <span>Record Group {recordGroup} &ndash; {recordCount}</span>
        }
        
        {series ? 
          <Fragment>
            <Link
              href={urlPath}>
              <a className={`link ${scoped.className}`}>Record Group {recordGroup}</a>
            </Link>
            <span>{seriesLabel} &ndash; {recordCount}</span>
          </Fragment>
          :
          <span>{seriesLabel}</span>
        }
        
        
      {scoped.styles}
      <style jsx>{`
        div {
          clear: left;
        }
        span {
          color: #212121;
          text-transform: uppercase;
          position: relative;
          font-weight: bold;
        }
        span:first-of-type {
          padding-left: 10px;
          font-weight: bold;
        }
        
      `}</style>
    </div>
  );
};

export default Breadcrumb;