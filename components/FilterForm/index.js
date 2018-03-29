import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';

import {locationIds} from '../filterTypes';

class FilterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: props.open
    }
  }

  render() {
    return(
      <div>
        <form>
          <h2>Filter Results By:</h2>
          <fieldset>
            <legend>Location</legend>
            <ul>
              {locationIds.map((locationId, index) => {
                return(
                  <li key={locationId.id}>
                    <label>
                      <input
                        name={locationId.id}
                        type="checkbox"
                        value={locationId.id}
                        onChange={this.props.handleLocationChange}
                      />
                      {locationId.name}
                    </label>
                  </li>
                );
              })}
            </ul>
            
          </fieldset>
          <Button onClick={this.props.handleFilterSubmit} text={'Apply'}></Button>
        </form>
        <style jsx>{`
          form {
            background: #f1f1f1;
            margin-top: 10px;
            padding: 20px 10px;
          }
          legend {
            font-weight: 700;
          }
          ul {
            list-style-type: none;
            margin: 10px 0;
            padding: 0;
          }
          li input {
            margin-right: 7px;
          }
          fieldset {
            border: 0;
            height: 45vh;
            overflow-x: scroll;
            column-count: 2;
            padding: 10px;
            margin: 10px 0;
            border: 1px #212121 solid;
          }
          `}
        </style>
      </div>
    );
  }
}

export default FilterForm;
