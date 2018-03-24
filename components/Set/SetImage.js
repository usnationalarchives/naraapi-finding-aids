import React from 'react';

const SetImage = ({image, alt, onclick, isFetching}) => {
  return(
    //onClick={this.toggleOpen}
    <div>
      {!isFetching &&
        <img  src={image} alt={alt} onClick={onclick}/>
      }
      <style jsx>{`
        img {
          width:300px;
          min-width:300px;
          height:300px;
        }
      `}</style>
      <style jsx>{`
        div {
          width:300px;
          min-width:300px;
          height:300px;
          animation-duration: 2s;
          animation-fill-mode: forwards;
          animation-iteration-count: infinite;
          animation-name: shimmerBackground;
          animation-timing-function: linear;
          background: #f6f7f8;
          background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
          background-size: 800px 104px;
          position: relative;
        }
        @keyframes shimmerBackground {
          0%{
            background-position: -468px 0
        }
        100%{
            background-position: 468px 0
        }
      }
      `}</style>
    </div>
  );
}

export default SetImage;
