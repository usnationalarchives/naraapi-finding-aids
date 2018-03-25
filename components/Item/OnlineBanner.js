import React from 'react';

const OnlineBanner = () => (
  <span>
    Online
    <style jsx>{`
      width: 50px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      position: absolute;
      z-index: 3;
      left: 75%;
      top: 0;
      background-color: #fff1d2;
    `}</style>
  </span>
)

export default OnlineBanner;