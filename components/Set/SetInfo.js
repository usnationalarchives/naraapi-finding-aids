import React from 'react';

const SetInfo = ({recordType, recordNumber, childRecords, isOpen}) => {
  return(
    //onClick={this.toggleOpen}
    <aside>
      {recordType == 'recordGroup' ? 
        (<span> Record Group {recordNumber} </span>) :
        (<span> Series {recordNumber} </span>)
      }
      /
      {recordType == 'recordGroup' ? 
        (<span> {childRecords} Series</span>) :
        (<span> {childRecords} Items</span>)
      }
      <style jsx>{`
        aside {
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #0071bc;
          width: 300px;
          font-size: 14px;
          padding: 0;
        }
      `}</style>
    </aside>
  );
}

export default SetInfo;
