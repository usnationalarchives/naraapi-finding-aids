import React from 'react';
import PropTypes from 'prop-types';

const ItemDescription = ({description}) => {
  return(
    <div>
      {(description && description.length > 200) ?
        <p>{description.substring(0,197) + '...'}</p>
      :
        <p>{description}</p>
      }
      <p>Click to learn more.</p>
      <style jsx>{`
        div {
          position: absolute;
          padding: 25% 20px;
          z-index: 4;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background-color: rgba(50, 58, 69, .9);
          color: #ffffff;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
        }
        p {
          margin: 0;
        }
      `}</style>
    </div>
  );
}

export default ItemDescription;
