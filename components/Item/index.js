import React from 'react';
import PropTypes from 'prop-types';

const Item = ({
  description,
  image,
  online,
  resultType,
  title,
  naid
}) => {
  return(
    <div>
      {image &&
        <img src={image} alt={title} />
      }
      <h3>{title}</h3>
      <p>{description}</p>
      <a href={'https://catalog.archives.gov/id/' + naid} target='_blank'>View in Catalog</a>
      <style jsx>{`
        img {
          width: 300px;
        }
        div {
          background:#f1f1f1;
          margin-bottom:20px;
          padding:20px;
        }
        div:nth-child(odd) {
          background:#dce4ef;
        }
      `}</style>
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
