import React from 'react';
import Link from 'next/link'
import PropTypes from 'prop-types';

const RecordGroup = ({data}) => {

  return(
    <div>
      <div>
        <img src='/static/placeholder.png' alt='Placeholder' />
      </div>
      <div>
        <p>{data.description.recordGroup.title}
          <style jsx>{`
            p {
              font-weight: bold;
            }
          `}</style>
        </p>
        {data.description.recordGroup.findingAidArray && 
          <p>{data.description.recordGroup.findingAidArray.findingAid.note}</p>
        }
        <Link href={{ pathname: '/', query: {naId: data.naId}}}>
          <a>View Record Group</a>
        </Link>
        
      </div>
    </div>
  )
}

export default RecordGroup;
