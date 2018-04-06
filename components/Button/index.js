import React from 'react';
import PropTypes from 'prop-types';

const Button = ({onClick, text, type, dark}) => {
  let btnHeight = 'auto';
  let btnWidth = 'auto';
  let btnFilter = '2.5rem';
  let btnMargin = '0';

  switch (type) {
    case 'more':
      btnHeight = '100%'
      break;
    case 'filter':
      btnHeight = '80px';
      btnWidth = '80px';
      btnFilter = '0';
      break;
    case 'apply':
      btnMargin = '0 auto';
      btnWidth = '50%';
      break;
    case 'text':
      btnMargin = '0 auto';
      btnWidth = '50%';
      break;
  }

  return(
    <button onClick={onClick}>
      {text}
      <style jsx>{`
        button {
          background: ${!dark ? '#ffffff' : ' #112e51'};
          border: 0;
          display: block;
          border-radius: ${btnFilter};
          color: ${!dark ? '#112e51' : '#ffffff'};
          cursor: pointer;
          font-size: 14px;
          font-weight: 700;
          height: ${btnHeight};
          width: ${btnWidth};
          margin: ${btnMargin};
          padding: ${type === 'apply' ? '10px 40px' : '10px 20px'};
          position: ${type === 'close' ? 'absolute' : 'relative'};
          top: ${type === 'close' ? '10px' : 'auto'};
          right: ${type === 'close' ? '10px' : 'auto'};
          text-indent: ${type === 'close' ? '-10000px' : '0'};
          overflow: ${type === 'close' ? 'hidden' : 'auto'};
        }
        button::after {
          content: ${type === 'close' ? '"X"' : '""'};
          font-size: 20px;
          line-height: 30px;
          height: 30px;
          width: 30px;
          text-align: center;
          display: inline;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          text-indent: 0;
        }
        button:hover {
          background: ${!dark ? '#112e51' : '#ffffff'} ;
          color: ${!dark ? '#ffffff' : '#205493'} ;
        }
        button:active {
          background: ${!dark ? '#112e51' : '#ffffff'};
          color: ${!dark ? '#ffffff' : '#205493'} ;
        }
        button:focus {
          outline: 2px dotted #aeb0b5;
          outline-offset: 3px;
        }
      `}</style>
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['default', 'close', 'more', 'filter'])
}

export default Button;
