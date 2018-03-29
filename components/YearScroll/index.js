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
      <p> Showing records with a start date of {year ? year : min} or later.</p>
      {min}
      <input type='range' min={min} max={max} step='10' value={year ? year : min} onChange={onchange}/>
      {max}
      <style jsx>{`
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
          box-shadow: 1px 1px 1px #323a45, 0px 0px 1px #212121;
          background: #0071bc;
          border-radius: 1.3px;
          border: 0.2px solid #010101;
        }
        input:focus::-webkit-slider-runnable-track {
          background: #367ebd;
        }
        input::-webkit-slider-thumb {
          box-shadow: 1px 1px 1px #323a45, 0px 0px 1px #212121;
          height: 36px;
          width: 16px;
          border-radius: 3px;
          background: #ffffff;
          cursor: pointer;
          -webkit-appearance: none;
          margin-top: -14px;
        }
      `}</style>
    </div>
  );
}

export default YearScroll;
