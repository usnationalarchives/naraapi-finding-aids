import React from 'react';

const OnlineBanner = () => (
  <span>
    Available Online
    <style jsx>{`
      width: 50px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      position: absolute;
      z-index: 3;
      left: 80%;
      top: 0;
      text-indent: -1000px;
      overflow: hidden;
      background: #0071bc url(/static/online-icon.svg) center center no-repeat;
    `}</style>
  </span>
)

export default OnlineBanner;