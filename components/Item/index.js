import React from 'react';
import {Fragment} from 'react';
import Link from 'next/link'
import PropTypes from 'prop-types';

import ItemImage from './ItemImage';
import OnlineBanner from './OnlineBanner';
import ItemHeader from './ItemHeader';
import ItemDescription from './ItemDescription';


class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      image: '/static/placeholder.png',
    }
    this.toggleOverlayOn = this.toggleOverlayOn.bind(this);
    this.toggleOverlayOff = this.toggleOverlayOff.bind(this);
  }

  toggleOverlayOn() {
    this.setState({open: true})
  }

  toggleOverlayOff() {
    this.setState({open: false})
  }

  render() {
    return (
      <a onMouseEnter={this.toggleOverlayOn} onMouseLeave={this.toggleOverlayOff}  href={'https://catalog.archives.gov/id/' + this.props.naid} target='_blank'>
        {this.props.object &&
          <OnlineBanner />
        }
        {this.props.object &&
          <ItemImage object={this.props.object} alt={this.props.title} />
        }
        <ItemHeader 
          title={this.props.title}
          tag={this.props.tag}
          date={this.props.date}
        />
        {this.state.open &&
          <ItemDescription description={this.props.description} />
        }
        
        <style jsx>{`
          img {
            width: 300px;
          }
          a {
            color: #212121;
            box-shadow: 1px 2px 12px -4px rgba(0,0,0,0.75);
            display: block;
            margin: 10px;
            width: 300px;
            position: relative;
            text-decoration: none;
          }
        `}</style>
      </a>
    );
  }
}

Item.propTypes = {
  description: PropTypes.string,
  image: PropTypes.string,
  object: PropTypes.bool.isRequired,
  resultType: PropTypes.oneOf(['item']).isRequired,
  title: PropTypes.string.isRequired,
}

export default Item;
