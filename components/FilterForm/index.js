import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';

import {locationIds, fileTypes} from '../filterTypes';
import FilterModal from './FilterModal';

class FilterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: props.open,
      filterModalOpen: false
    }
  }

  render() {
    const scoped = resolveScopedStyles(
      <scope>
        <style jsx>{`
          .modal {
            height: 100vh;
            width: 100vw;
            position: fixed;
            top: 0;
            left: 0;
            margin: 0;
            z-index: 15;
            background-color: rgba(50, 58, 69, .9);
          }
          .modal::before {
            display: block;
            width: 100%;
            height: 100%;
            content: "";
            opacity: 0.3;
            background-color: rgba(50, 58, 69, 1);
            backdrop-filter: blur(5px);
          }
          .inner-modal {
            height: 70vh;
            width: 70vw;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 20px 30px 10px;
            background: #ffffff;
          }
          .inner-list {
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            height: 90%;
            overflow: scroll;
            margin-bottom: 20px;
            color: #212121;
            padding: 0 20px;
          }
          .inner-li {
            margin-right: 20px;
          }
          .inner-fieldset {
            height: 75%;
          }
          .inner-legend {
            color: #212121;
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
        <form onSubmit={(event) => event.preventDefault()}>
          <h2>Filter Results By</h2>
          <fieldset>
            <legend>Location</legend>
            <ul>
              {locationIds.slice(0, 5).map((locationId, index) => {
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
            
            <Button 
              text={'View More Locations'}
              dark={true}
              type={'text'}
              onClick={() => this.setState({filterModalOpen: !this.state.filterModalOpen})}
            />
          </fieldset>
          <fieldset>
            <legend>File Type</legend>
            <ul>
              {fileTypes.map((fileType, index) => {
                return(
                  <li key={index}>
                    <label>
                      <input
                        name={fileType.name}
                        type="checkbox"
                        value={fileType.id}
                        onChange={null}
                      />
                      {fileType.name}
                    </label>
                  </li>
                );
              })}
            </ul>
          </fieldset>
          {this.state.filterModalOpen &&
              <FilterModal>
                <div className={`modal ${scoped.className}`}>
                  <div className={`inner-modal ${scoped.className}`}>
                  <Button
                    onClick={() => this.setState({filterModalOpen: !this.state.filterModalOpen})}
                    text={'Close'}
                    type={'close'}
                    dark={false}
                  />
                  <fieldset className={`inner-fieldset ${scoped.className}`}>
                    <legend className={`inner-legend ${scoped.className}`}>Location</legend>
                    <ul className={`inner-list ${scoped.className}`}>
                      {locationIds.map((locationId, index) => {
                        return(
                          <li className={`inner-li ${scoped.className}`} key={locationId.id}>
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
                  <Button 
                      text={'Apply'}
                      dark={true}
                      type={'default'}
                    />
                  </div>
                </div>
                {scoped.styles}
              </FilterModal>
            }
          <Button onClick={this.props.handleFilterSubmit} text={'Apply'} type={'default'} dark={false} />
          <Button onClick={null} text={'Reset Filters'} type={'text'} dark={true} />
        </form>
        <div id="toggle">
          <Button
            onClick={this.props.handleOpen}
            text={this.props.open ? 'Close' : 'Filter'}
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
            height: 100%;
            min-width: 300px;
            position: fixed;
            transition: left 2s;
          }
          h2 {
            text-align: left;
          }
          form {
            text-align: center;
          }
          legend {
            font-weight: 700;
            text-transform: uppercase;
            text-align: left;
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
            padding: 10px 0;
            margin: 10px 0;
            border: 0;
            text-align: left;
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
