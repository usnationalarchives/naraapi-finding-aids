import React from 'react';
import PropTypes from 'prop-types';

const Header = ({text}) => {
  return (
    <div>
      <h1>
        {text}
        <style jsx>{`
        	@import url('https://fonts.googleapis.com/css?family=Merriweather');
          h1 {
          	color: #205493;
          	font-family: "Merriweather", serif;
          	font-weight: 700;
          	font-size: 35px;
          	line-height: 52px;
          }
        `}</style>
      </h1>
    </div>
  );
};

Header.propTypes = {

}

export default Header;
