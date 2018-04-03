import React from 'react';
import PropTypes from 'prop-types';

const ItemDescription = ({description}) => {
  return(
    <div>
      {description}
      <style jsx>{`
        position: absolute;
        padding: 20px;
        z-index: 4;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(0,0,0,.7);
        color: #ffffff;
      `}</style>
    </div>
  );
}

export default ItemDescription;
