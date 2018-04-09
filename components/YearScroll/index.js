import React from 'react';

const YearScroll = ({results, onchange, year}) => {
  let min = 0;
  let max = 0;

  for(let i = 0; i < results.length; i++) {
    let startDate = Number(results[i].description.recordGroup.inclusiveDates.inclusiveStartDate.year);
    if(results[i].description.recordGroup.inclusiveDates.inclusiveEndDate) {
      
      let endDate = Number(results[i].description.recordGroup.inclusiveDates.inclusiveEndDate.year);
      if(max < endDate ) {
        max = endDate;
      }
    }
    
    if(min == 0) {
      min = startDate;
    }

    if(startDate < min) {
      min = startDate;
    }
  }

  return(
    <div>
      {/* <p> Showing records with a start date of {year ? year : min} or later.</p> */}
      <span>{min}</span>
      <input type='range' min={min} max={max} step='10' value={year ? year : min} onChange={onchange}/>
      <span>{max}</span>
      <style jsx>{`
        div {
          padding-top: 6px;
        }
        span {
          color: #112e51;
          font-weight: bold;
        }
        p {
          margin-top: 0;
          color: #212121;
        }
        input {
          -webkit-appearance: none;
          width: 50vw;
          margin: 0 10px;
        }
        input::-webkit-slider-runnable-track {
          width: 100%;
          cursor: pointer;
          height: 8px;
          animate: all 0.2s;
          background: #d6d7d9;
          border-radius: 2.5rem;
          border: 0.2px solid #010101;
        }
        input::-webkit-slider-thumb {
          box-shadow: 1px 1px 1px #323a45, 0px 0px 1px #212121;
          height: 36px;
          width: 36px;
          border-radius: 50%;
          background: #112e51;
          cursor: pointer;
          -webkit-appearance: none;
          margin-top: -14px;
        }
      `}</style>
    </div>
  );
}

export default YearScroll;
