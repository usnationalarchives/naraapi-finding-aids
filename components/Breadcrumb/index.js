import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const Breadcrumb = ({recordGroup, series, records}) => {
  return(
    <div>
      {recordGroup &&
        <Link 
          href={{ pathname: '/record-group', query: {id: recordGroup}}}>
          <a>Record Group {recordGroup} |</a>
        </Link>
      }
      {recordGroup &&
        <span>Series | </span> 
      }
      {recordGroup &&
        <span>{records} Records</span> 
      }
    </div>
  );
};

export default Breadcrumb;
