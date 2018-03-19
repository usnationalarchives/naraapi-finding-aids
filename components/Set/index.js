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

  let path_name;
  let query_key;

  if(resultType == 'recordGroup') {
    query_key = 'recordGroup';
    path_name = 'record-group';
  } else {
    query_key = 'series';
    path_name = 'series';
  }

  return(
    <div>
      <h2>{title}</h2>
      <Link href={{ pathname: '/' + path_name, query: {id: setNumber}}}>
        <a>View {query_key}</a>
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
