import React from 'react';
import {Fragment} from 'react';

const ItemImage = ({object, alt}) => {
  let imgUrl;
  if (object) {
    if (Array.isArray(object.object)) {
      imgUrl = object.object[0].file['@url'];
    } else {
      imgUrl = object.object.file['@url'];
    }
  }

  return(
    <div>
      <img src={imgUrl} alt={alt} />
      <style jsx>{`
        img {
          width:300px;
        }
        div {
          width: 300px;
          height: 150px;
          overflow: hidden;
          position: relative;
        }
      `}</style>
    </div>
  )
}

export default ItemImage;
