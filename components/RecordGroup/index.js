import React from 'react';
import PropTypes from 'prop-types';

const RecordGroup = ({data}) => {

  return(
    <section>
      <h1>{data.description.recordGroup.title}</h1>
    </section>
  )
}

export default RecordGroup;
