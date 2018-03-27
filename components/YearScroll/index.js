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
     <p> Showing records from {year ? year : min} until {max}.</p>
      {min}
      <input type='range' min={min} max={max} step='10' value={year ? year : min} onChange={onchange}/>
      {max}

    </div>
  );
}

export default YearScroll;
