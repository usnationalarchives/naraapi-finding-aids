import React from 'react';
import PropTypes from 'prop-types';

const Button = ({onClick, text, type, dark, centered}) => {
  let btnHeight = 'auto';
  let btnWidth = 'auto';
  let btnFilter = '2.5rem';
  let btnMargin = '0';

  let btnStyle;
  
  switch (type) {
    case 'more':
      btnStyle = {
        height: '100%',
        width: 'auto',
        background: !dark ? '#ffffff' : ' #112e51',
        margin: '0',
        padding: '10px 20px',
        border: '2px solid transparent',
        borderRadius: '2.5rem',
        hover: {
          background: !dark ? '#112e51' : '#ffffff',
          color: !dark ? '#ffffff' : '#205493',
          border: !dark ? '2px solid #ffffff' : '2px solid #205493'
        }
      }
      break;
    case 'filter':
      btnStyle = {
        display: 'block',
        height: '80px',
        width: '80px',
        background: !dark ? '#ffffff' : ' #112e51',
        margin: '0',
        padding: '10px 20px',
        border: '2px solid transparent',
        borderRadius: '0',
        hover: {
          background: !dark ? '#112e51' : '#ffffff',
          color: !dark ? '#ffffff' : '#112e51',
          border: !dark ? '2px solid #ffffff' : '2px solid #112e51'
        }
      }
      btnFilter = '0';
      break;
    case 'default':
      btnStyle = {
        display: 'block',
        height: 'auto',
        width: 'auto',
        background: !dark ? '#ffffff' : ' #112e51',
        margin: '0 auto 20px',
        padding: '10px 40px',
        border: '2px solid transparent',
        borderRadius: '2.5rem',
        hover: {
          background: !dark ? '#112e51' : '#ffffff',
          color: !dark ? '#ffffff' : '#205493',
          border: !dark ? '2px solid #ffffff' : '2px solid #205493'
        }
      }
      break;
    case 'text':
      btnStyle = {
        display: 'inline-block',
        height: 'auto',
        width: 'auto',
        background: 'none',
        margin: '0 auto',
        padding: '0',
        border: '2px solid transparent',
        borderRadius: '2.5rem',
        hover: {
          background: 'transparent',
          color: !dark ? '#205493' : '#ffffff',
          border: '2px solid transparent'
        }
      }
      break;
    case 'close':
      btnStyle = {
        display: 'block',
        height: 'auto',
        width: 'auto',
        background: !dark ? '#ffffff' : ' #112e51',
        margin: '0',
        padding: '8px 15px',
        border: '2px solid transparent',
        borderRadius: '50%',
        hover: {
          background: 'transparent',
          color: !dark ? '#112e51' : '#ffffff',
          border: !dark ? '2px solid #112e51' : '2px solid #ffffff'
        }
      }
      break;
  }

  return(
    <button onClick={onClick}>
      {text}
      <style jsx>{`
        button {
          background: ${btnStyle.background};
          border: 0;
          display: ${btnStyle.display};
          border-radius: ${btnStyle.borderRadius};
          color: ${!dark ? '#112e51' : '#ffffff'};
          cursor: pointer;
          font-size: 14px;
          font-weight: 700;
          height: ${btnStyle.height};
          width: ${btnStyle.width};
          margin: ${btnStyle.margin};
          padding: ${btnStyle.padding};
          border: ${btnStyle.border};
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
          background: ${btnStyle.hover.background};
          color: ${btnStyle.hover.color};
          border: ${btnStyle.hover.border};
          text-decoration: ${type === 'text' ? 'underline' : 'none'};
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
  type: PropTypes.oneOf(['default', 'close', 'more', 'filter', 'text'])
}

export default Button;
