import React, {Fragment} from 'react';

import YearScroll from '../YearScroll';
import Breadcrumb from '../Breadcrumb';

const Subheader = ({
  title,
  resultType,
  recordGroup,
  query,
  totalResults,
  results,
  onchange,
  year,
  filterOpen
}) => {
  return(
    <div id="subheader" className={query ? 'breadcrumb' : 'timeline'}>
      {query ?
        <Fragment>
          <h2>{title}</h2>
          <Breadcrumb 
            recordGroup={recordGroup}
            series={resultType == 'item' ? query : ''}
            totalResults={totalResults}
          />
        </Fragment>
      :
        <Fragment>
          <h2>{title}</h2>
          {resultType === 'recordGroup' &&
            <YearScroll results={results} onchange={onchange} year={year}/>
          }
        </Fragment>
      }
      <style jsx>{`
        div {
          transition: all 2s;
          position: fixed;
          padding-top: 0;
          height: auto;
          width: 100vw;
          padding-bottom: 25px;
          padding-left: 100px;
          top: 93px;
          left: 0;
          z-index: 5;
          background-color: #f1f1f1;
        }
        .breadcrumb h2 {
          width: 80vw;
        }
        .timeline {
          padding-top: 20px;
        }
        .timeline h2 {
          display: inline-block;
          float: left;
          margin: 0 40px 20px 0;
        }
        .breadcrumb h2 {
          margin-bottom: 0;
        }
        
      `}</style>
      <style jsx>{`
        #subheader {
          transform: ${filterOpen ? 'translateX(360px)' : 'translateX(0)'};
        }
      `}</style>
    </div>
  );
}

export default Subheader;
