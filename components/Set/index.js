import React from 'react';
import {Fragment} from 'react';
import Link from 'next/link'
import PropTypes from 'prop-types';

const Set = ({
  description,
  open,
  resultType,
  setChildren,
  setNumber,
  title
}) => {

  let linkTitle;
  let queryKey;

  if(resultType == 'recordGroup') {
    linkTitle = 'View Record Group';
    queryKey = 'recordGroup';
  } else {
    linkTitle = 'View Series';
    queryKey = 'series';
  }

  return(
    <div>
      <h2>{title}</h2>
      <Link href={{ pathname: '/', query: {[queryKey]: setNumber}}}>
        <a>{linkTitle}</a>
      </Link>
      <style jsx>{`
        div {
          background:#f1f1f1;
          margin-bottom:20px;
          padding:20px;
        }
        div:nth-child(odd) {
          background:#dce4ef;
        }
      `}</style>
    </div>
  )
}

Set.propTypes = {
  description: PropTypes.string,
  open: PropTypes.bool.isRequired,
  resultType: PropTypes.oneOf(['recordGroup', 'series']).isRequired,
  setChildren: PropTypes.number.isRequired,
  setNumber: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
}

export default Set;
