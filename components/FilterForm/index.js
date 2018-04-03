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
    const scoped = resolveScopedStyles(
      <scope>
        <style jsx>{`
          .toggle {
            position: absolute;
            left: 100%;
            margin: 0;
            display: block;
            top: 0px;
            z-index: 20;
            padding: 0;
            width: auto;
          }
        `}</style>
      </scope>
    )
  
    function resolveScopedStyles(scope) {
      return {
        className: scope.props.className,
        styles: scope.props.children
      }
    }
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
        <div className={`toggle ${scoped.className}`}>
          <Button
            onClick={this.props.handleOpen}
            text={this.state.filterOpen ? 'Hide Filter' : 'Show Filter'}
          />
        </div>
        {scoped.styles}
        <style jsx>{`
          div {
            background: #f1f1f1;
            margin-top: 10px;
            padding: 10px 30px 20px;
            position: fixed;
            width: 300px;
            left: ${this.props.open ? '0' : '-360px'};
            top: 0;
            z-index: 5;
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
