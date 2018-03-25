import React from 'react';

const Button = ({onClick, text}) => {
  return(
    <button onClick={onClick}>
      {text}
      <style jsx>{`
        button {
          background: #0071bc;
          border: 0;
          border-radius: 5px;
          color: #ffffff;
          cursor: pointer;
          font-size: 14px;
          font-weight: 700;
          padding: 10px 20px;
        }
        button:hover {
          background: #205493;
        }
        button:active {
          background: #112e51;
        }
        button:focus {
          outline: 2px dotted #aeb0b5;
          outline-offset: 3px;
        }
      `}</style>
    </button>
  );
}

export default Button;
