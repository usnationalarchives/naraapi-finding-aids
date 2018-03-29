import React from 'react';
import PropTypes from 'prop-types';

const Header = ({text}) => {
  return (
    <div>
      <h1>
        {text}
      </h1>
      <style jsx>{`
          h1 {
            color: #ffffff;
            font-weight: 700;
            font-size: 35px;
            line-height: 52px;
          }
        `}</style>
    </div>
  );
};

Header.propTypes = {

}

export default Header;
