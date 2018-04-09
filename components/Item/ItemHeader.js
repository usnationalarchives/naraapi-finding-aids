import React from 'react';

const ItemHeader = ({title, tag, date}) => {
  let dateFormatted;
  if(date) {
    let newDate = new Date(date);
    dateFormatted = (newDate.getMonth() + 1) + '.' + newDate.getDate() + '.' +  newDate.getFullYear();
  }

  return(
    <div>
      {(title && title.length > 75) ?
        <h3>{title.substring(0,75) + '...'}</h3>
      :
      <h3>{title}</h3>
      }

      <ul>
        <li>
          {tag}
        </li>
        <li>
          {dateFormatted}
        </li>
      </ul>
      <style jsx>{`
        div {
          padding: 20px;
          color: #212121;
        }
        ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        h3 {
          margin-bottom: 0;
        }
      `}</style>
    </div>
  )
}

export default ItemHeader;
