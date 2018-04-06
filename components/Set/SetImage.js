import React from 'react';

const SetImage = ({image, alt, onclick, isFetching, visualSize}) => {
  return(
    //onClick={this.toggleOpen}
    <div>
      {!isFetching &&
        <img src={image} alt={alt} onClick={onclick}/>
      }
      <style jsx>{`
        img {
          width: ${image == '/static/nara-horizontal-logo.svg' ? '90%' : '150%'};
          position: absolute;
          transform: ${image == '/static/nara-horizontal-logo.svg' ? 'translateY(-50%)' : 'translateY(0)'};
          top: ${image == '/static/nara-horizontal-logo.svg' ? '50%' : '0'};
          left: ${image == '/static/nara-horizontal-logo.svg' ? '5%' : '-30%'};
          
        }
        div {
          width: 300px;
          min-width: 300px;
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
          cursor: pointer;
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
