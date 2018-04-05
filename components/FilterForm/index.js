import React, {Fragment} from 'react';
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
          <Button onClick={this.props.handleFilterSubmit} text={'Apply'} />
          
        </form>
        <div id="toggle">
          <Button
            onClick={this.props.handleOpen}
            text={this.state.filterOpen ? 'Hide Filter' : 'Filter'}
            dark={true}
            type={'filter'}
          />
        </div>
        
        <style jsx>{`
          div {
            background: #112e51;
            padding: 10px 30px 20px;
            left: ${this.props.open ? '0' : '-360px'};
            top: 93px;
            z-index: 10;
            color: #ffffff;
            width: 300px;
            min-width: 300px;
            position: fixed;
            transition: left 2s;
          }
          legend {
            font-weight: 700;
            text-transform: uppercase;
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
            border: 0;
          }
          #toggle {
            position: absolute;
            left: 100%;
            margin: 0;
            display: block;
            top: 0;
            z-index: 5;
            padding: 0;
            width: 80px;
            height: 80px;
            max-width: 80px;
            min-width: 80px;
          }
          `}
        </style>
      </div>
    );
  }
}

export default FilterForm;
