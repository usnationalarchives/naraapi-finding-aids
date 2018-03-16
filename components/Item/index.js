import React from 'react';
import PropTypes from 'prop-types';

const Item = ({
  description,
  image,
  online,
  resultType,
  title
}) => {
  return(
    <div>
      {title}
    </div>
  );
};

Item.propTypes = {
  description: PropTypes.string,
  image: PropTypes.string,
  online: PropTypes.bool.isRequired,
  resultType: PropTypes.oneOf(['item']).isRequired,
  title: PropTypes.string.isRequired,
}

export default Item;
