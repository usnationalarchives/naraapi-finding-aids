import React from 'react';

const ItemHeader = ({title, description, tag, date}) => {
  let dateFormatted;
  if(date) {
    let newDate = new Date(date);
    dateFormatted = (newDate.getMonth() + 1) + '.' + newDate.getDate() + '.' +  newDate.getFullYear();
  }

  return(
    <div>
      <h3>{title}</h3>
      <ul>
        <li>
          {tag}
        </li>
        <li>
          {dateFormatted}
        </li>
      </ul>
      <p>{description}</p>
      <style jsx>{`
        div {
          padding: 20px;
        }
        ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
      `}</style>
    </div>
  )
}

export default ItemHeader;
