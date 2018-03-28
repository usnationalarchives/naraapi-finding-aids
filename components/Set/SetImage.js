import React from 'react';

const SetImage = ({image, alt, onclick, isFetching, visualSize}) => {
  return(
    //onClick={this.toggleOpen}
    <div>
      {!isFetching &&
        <img  src={image} alt={alt} onClick={onclick}/>
      }
      <style jsx>{`
        img {
          width: 150%;
          position: absolute;
          left: -30%;
          
        }
        div {
          width: 400px;
          min-width: 400px;
          height: ${visualSize};
          animation-duration: 2s;
          animation-fill-mode: forwards;
          animation-iteration-count: infinite;
          animation-name: ${isFetching ? 'shimmerBackground' : 'none'};
          animation-timing-function: linear;
          background: ${isFetching ? 'linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%)' :' #f6f7f8'};
          background-size: 800px 104px;
          position: relative;
          overflow: hidden;
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
