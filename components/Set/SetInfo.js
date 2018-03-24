import React from 'react';

const SetInfo = ({recordType, recordNumber, childRecords, isOpen}) => {
  return(
    //onClick={this.toggleOpen}
    <aside>
      {recordType == 'recordGroup' ? 
        (<span> Record Group {recordNumber} </span>) :
        (<span> Series {recordNumber} </span>)
      }
      |
      {recordType == 'recordGroup' ? 
        (<span> {childRecords} Series</span>) :
        (<span> {childRecords} Items</span>)
      }
      <style jsx>{`
        aside {
          text-transform: uppercase;
          letter-spacing: 1px;
          width: 300px;
          padding: 10px 0;
        }
      `}</style>
      <style jsx>{`
        aside {
          color: ${isOpen ? '#ffffff' : '#212121'}
        }
      `}</style>
    </aside>
  );
}

export default SetInfo;
