import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';

import {locationIds} from '../filterTypes';

class FilterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
  }

  render() {
    return(
      <div>
        <form>
          {/* <fieldset>
            <legend>File Type</legend>
            <ul>
              <li><label>
                <input
                  name="audio"
                  type="checkbox"
                  value={"audio"}
                  onChange={this.handleChange}
                />
                Audio
              </label></li>
              <li><label>
                <input
                  name="video"
                  type="checkbox"
                  value={"video"}
                  onChange={this.handleChange}
                />
                Video
              </label></li>
              <li><label>
                <input
                  name="image"
                  type="checkbox"
                  value={"image"}
                  onChange={this.handleChange}
                />
                Image
              </label></li>
              <li><label>
                <input
                  name="document"
                  type="checkbox"
                  value={"document"}
                  onChange={this.handleChange}
                />
                Document
              </label></li>
            </ul>
          </fieldset> */}
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
        {/* <style jsx>{`
          div {
            position: fixed;
            top: 0;
            width: 400px;
          }
          button {
            position: absolute;
            right: -50px;
            width: 50px;
          }
        `}</style> */}
        {/* <style jsx>{`
          div {
            left: ${this.state.open ? 0 : -100 + '%'}
          }
        `}</style> */}
      </div>
    );
  }
}

export default FilterForm;
