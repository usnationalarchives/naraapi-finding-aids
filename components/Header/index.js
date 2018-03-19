import React from 'react';
import PropTypes from 'prop-types';

const Header = ({text}) => {
  return (
    <div>
      <h1>
        {text}
      </h1>
    </div>
  );
};

Header.propTypes = {

}

export default Header;