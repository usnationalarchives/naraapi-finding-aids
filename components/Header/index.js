import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import YearScroll from '../YearScroll';
import Breadcrumb from '../Breadcrumb';

const Header = ({
  query,
  resultType,
  recordGroup,
  totalResults,
  results,
  year,
  onchange
}) => {
  const scoped = resolveScopedStyles(
    <scope>
      <style jsx>{`
        .link:link,
        .link:visited {
          background: url(/static/nara-horizontal-logo.svg) no-repeat left top;
          background-size: 185px 45px;
          padding-left: 185px;
          color: #212121;
          font-weight: 700;
          font-size: 35px;
          line-height: 52px;
          position: relative;
          text-decoration: none;
          display: inline-block;
        }
        .link:before {
          content: "";
          border-left: 2px solid #205493;
          position: inline-block;
          padding-right: 20px;
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
  return (
    <header>
      <div>
        <h1>
          <Link href={{ pathname: '/'}}>
            <a className={`link ${scoped.className}`}>Finding Aids</a>
          </Link>
        </h1>
      </div>
      
      {scoped.styles}
      <style jsx>{`
        header {
          background: #f1f1f1;
          left: 0;
          position: fixed;
          top: 0;
          width: 100%;
          z-index: 10;
        }
        div {
          border-bottom: 1px solid #d6d7d9;
          box-shadow: 0 0 10px #d6d7d9;
          padding-top: 20px;
          padding-bottom: 20px;
          padding-left: 80px;
          background: #ffffff;
        }
        div + div {
          padding-top: 20px;
          box-shadow: none;
          border: 0;
          background: transparent;
        }
        h1 {
          margin: 0;
          padding: 0;
        }
        h2 {
          color: #0071bc;
          font-size: 30px;
          margin: 0;
        }
      `}</style>
    </header>
  );
};

Header.propTypes = {

}

export default Header;
